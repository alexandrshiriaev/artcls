import BodyEditor from '@/components/story-editor/body-editor';
import TitleEditor from '@/components/story-editor/title-editor';

import '@/components/story-editor/styles.scss';

interface StoryEditorProps {
    editable: boolean;
}

export default function StoryEditor({ editable }: StoryEditorProps) {
    return (
        <div className="space-y-8">
            <TitleEditor editable={editable} />
            <BodyEditor editable={editable} />
        </div>
    );
}
