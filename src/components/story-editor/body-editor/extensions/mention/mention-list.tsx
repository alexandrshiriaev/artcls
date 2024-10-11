import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';

import type { MentionItem } from '@/components/story-editor/body-editor/extensions/mention/index';

interface MentionListProps {
    items: MentionItem[];
    command: ({ id, label }: { id: string; label: string }) => void;
}

// eslint-disable-next-line react/display-name
export default forwardRef((props: MentionListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
        const item = props.items[index];

        if (item) {
            props.command({ id: item.username, label: item.name });
        }
    };

    const upHandler = () => {
        setSelectedIndex(
            (selectedIndex + props.items.length - 1) % props.items.length,
        );
    };

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
        selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        // @ts-ignore
        onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
                upHandler();
                return true;
            }

            if (event.key === 'ArrowDown') {
                downHandler();
                return true;
            }

            if (event.key === 'Enter') {
                enterHandler();
                return true;
            }

            return false;
        },
    }));

    return (
        <div className="flex flex-col">
            {props.items.length ? (
                props.items.map((item, index) => (
                    <button
                        className={cn({
                            'text-white bg-emerald-500':
                                selectedIndex === index,
                            'text-gray-700 bg-white': selectedIndex !== index,
                        })}
                        key={index}
                        onClick={() => selectItem(index)}
                        onMouseEnter={() => {
                            setSelectedIndex(index);
                        }}
                    >
                        <div className="flex justify-between">
                            <div>
                                <span>{item.name}</span>
                                <UserAvatar
                                    alt={item.name}
                                    src={item.image}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className="italic">{item.username}</span>
                        </div>
                    </button>
                ))
            ) : (
                <div className="item">No result</div>
            )}
        </div>
    );
});
