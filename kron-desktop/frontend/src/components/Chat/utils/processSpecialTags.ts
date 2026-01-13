interface MessagePart {
  type: string;
  content: any;
}

export const processSpecialTags = (text: string): MessagePart[] => {
  const allPossibleActionTags =
    /<open_url>|<followup_question>|<inspect>|<screenshot>|<ui_action>|<error>|<complete_task>/g;

  const parts: MessagePart[] = [];

  // Find all matches and their positions
  let matches: {
    index: number;
    length: number;
    content: any;
    type: string;
  } | null = null;

  const tagsInMessage = text.match(allPossibleActionTags) || [];
  if (tagsInMessage.length > 0) {
    matches = processTags(tagsInMessage[0] as string, text);
    parts.push({
      type: "text",
      content: getTextContent(text, tagsInMessage[0] as string),
    });
    parts.push({
      type: matches?.type as string,
      content: matches?.content,
    });
  }
  return parts;
};

const processTags = (tag: string, text: string) => {
  const urlRegex = /<open_url>\s*<url>(.*?)<\/url>\s*<\/open_url>/g;
  const questionRegex =
    /<followup_question>[\s\n]*<question>[\s\n]*(.*?)[\s\n]*<\/question>[\s\n]*<\/followup_question>/gs;
  const inspectRegex = /<inspect>([\s\S]*?)<\/inspect>/g;
  const screenshotRegex = /<screenshot>.*?<\/screenshot>/g;
  const browserActionRegex =
    /<ui_action>[\s\S]*?<action>(.*?)<\/action>(?:[\s\S]*?<coordinate>(.*?)<\/coordinate>)?(?:[\s\S]*?<text>([\s\S]*?)<\/text>)?(?:[\s\S]*?<about_this_action>([\s\S]*?)<\/about_this_action>)?[\s\S]*?<\/ui_action>/g;
  const errorRegex = /<error>([\s\S]*?)<\/error>/g;
  const completeTaskRegex = /<complete_task>([\s\S]*?)<\/complete_task>/g;

  let matches: {
    index: number;
    length: number;
    content: any;
    type: string;
  } | null = null;

  let match;

  switch (tag) {
    case "<open_url>":
      while ((match = urlRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: match[1].trim(),
          type: "url",
        };
      }
      break;
    case "<followup_question>":
      while ((match = questionRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: match[1].trim(),
          type: "question",
        };
      }
      break;
    case "<inspect>":
      while ((match = inspectRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: match[1].trim(),
          type: "inspect",
        };
      }
      break;
    case "<screenshot>":
      while ((match = screenshotRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: "",
          type: "screenshot",
        };
      }
      break;
    case "<ui_action>":
      while ((match = browserActionRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: {
            action: match[1].trim(),
            coordinate: match[2] ? match[2].trim() : undefined,
            text: match[3] ? match[3].trim() : undefined,
            aboutThisAction: match[4] ? match[4].trim() : undefined,
            key: undefined,
          },
          type: "ui_action",
        };
      }
      break;

    case "<error>":
      while ((match = errorRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: match[1].trim(),
          type: "error",
        };
      }
      break;
    case "<complete_task>":
      while ((match = completeTaskRegex.exec(text)) !== null) {
        matches = {
          index: match.index,
          length: match[0].length,
          content: match[1].trim(),
          type: "complete_task",
        };
      }
      break;
  }
  return matches;
};

const getTextContent = (text: string, tag: string) => {
  const prefixText = text.split(tag);
  return prefixText.length > 0 ? (prefixText[0] as string) : "";
};
