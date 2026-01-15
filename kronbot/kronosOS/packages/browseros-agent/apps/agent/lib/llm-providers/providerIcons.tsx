import type { FC } from 'react'

interface ProviderIconProps {
  type: ProviderType
  size?: number
  className?: string
}

export const ProviderIcon: FC<ProviderIconProps> = ({
  size = 20,
  className,
}) => {
  return (
    <img
      src="/icon/mainkronos-logo.png"
      alt="kronosOS-assistant"
      width={size}
      height={size}
      className={className}
    />
  )
}

export const KronosIcon: FC<{ size?: number; className?: string }> = ({
  size = 20,
  className,
}) => {
  return (
    <img
      src="/icon/mainkronos-logo.png"
      alt="kronosOS-assistant"
      width={size}
      height={size}
      className={className}
    />
  )
}