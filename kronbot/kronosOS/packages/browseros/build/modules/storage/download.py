#!/usr/bin/env python3
"""Download module for fetching build resources from Cloudflare R2"""

import yaml
from pathlib import Path
from typing import List

from ...common.module import CommandModule, ValidationError
from ...common.context import Context
from ...common.utils import (
    log_info,
    log_error,
    log_success,
    log_warning,
    get_platform,
)

from .r2 import (
    BOTO3_AVAILABLE,
    get_r2_client,
    download_file_from_r2,
)


class DownloadResourcesModule(CommandModule):
    """Download resources from Cloudflare R2 before build

    This module downloads binaries and other resources from R2 that are
    required for the build but not stored in the repository.

    Behavior:
        - Always clears existing files and re-downloads (ensures latest)
        - Fails immediately if any download fails
        - For universal builds on macOS, downloads both arm64 and x64 binaries
    """

    produces = []
    requires = []
    description = "Download resources from Cloudflare R2"

    def validate(self, context: Context) -> None:
        if not BOTO3_AVAILABLE:
            raise ValidationError(
                "boto3 library not installed - run: pip install boto3"
            )

        if not context.env.has_r2_config():
            raise ValidationError(
                "R2 configuration not set. Required env vars: "
                "R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY"
            )

        config_path = context.get_download_resources_config()
        if not config_path.exists():
            raise ValidationError(
                f"Download configuration file not found: {config_path}"
            )

    def execute(self, context: Context) -> None:
        log_info("\nDownloading resources from R2...")

        config_path = context.get_download_resources_config()
        with open(config_path, "r") as f:
            config = yaml.safe_load(f)

        if "download_operations" not in config:
            log_info("No download_operations defined in configuration")
            return

        operations = config["download_operations"]
        filtered_ops = self._filter_operations(operations, context)

        if not filtered_ops:
            log_info("No downloads needed for current platform/architecture")
            return

        log_info(f"Downloading {len(filtered_ops)} resource(s)...")

        client = get_r2_client(context.env)
        if not client:
            raise RuntimeError("Failed to create R2 client")

        bucket = context.env.r2_bucket

        for op in filtered_ops:
            name = op.get("name", "Unnamed")
            r2_key = op["r2_key"]
            destination = op["destination"]
            dest_path = context.root_dir / destination

            log_info(f"  {name}")

            # Clear existing file (always re-download)
            if dest_path.exists():
                dest_path.unlink()
                log_info(f"    Cleared existing: {dest_path.name}")

            # Download from R2
            if not download_file_from_r2(client, r2_key, dest_path, bucket):
                raise RuntimeError(f"Failed to download: {name}")

            # Set executable permissions if specified
            if op.get("executable", False):
                dest_path.chmod(dest_path.stat().st_mode | 0o755)
                log_info(f"    Set executable permissions")

        log_success(f"Downloaded {len(filtered_ops)} resource(s) from R2")

    def _filter_operations(
        self,
        operations: List[dict],
        context: Context,
    ) -> List[dict]:
        """Filter operations based on os, arch, and build_type conditions

        For universal builds on macOS, includes both arm64 and x64 operations.
        """
        current_os = get_platform()
        current_arch = context.architecture
        current_build_type = context.build_type

        # For universal builds, we need both arm64 and x64
        target_archs = [current_arch]
        if current_arch == "universal":
            target_archs = ["arm64", "x64", "universal"]

        filtered = []

        for op in operations:
            # Check OS condition
            os_condition = op.get("os")
            if os_condition and current_os not in os_condition:
                continue

            # Check architecture condition
            arch_condition = op.get("arch")
            if arch_condition:
                # Check if any target arch matches any condition arch
                if not any(arch in arch_condition for arch in target_archs):
                    continue

            # Check build_type condition
            build_type_condition = op.get("build_type")
            if build_type_condition and build_type_condition != current_build_type:
                continue

            filtered.append(op)

        return filtered
