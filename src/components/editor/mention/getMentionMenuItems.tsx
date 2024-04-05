import { DefaultReactSuggestionItem } from '@blocknote/react';
import { schema } from '../schema';

// Function which gets all users for the mentions menu.
export const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactSuggestionItem[] => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
    },
  }));
};
