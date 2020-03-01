import { useRef, useCallback } from 'react';
import getScrollToBottom from '../../helpers/getScrollToBottom';

export default ({ loading, loadData }) => {
    const scrollHandled = useRef(null);

    const scrollHandler = useCallback(() => {
        const scrollToBottom = getScrollToBottom();

        if (!loading && scrollHandled.current !== scrollToBottom && scrollToBottom < 200) {
            loadData();
        }
        setTimeout(() => {
            scrollHandled.current = scrollToBottom;
        });
    }, [loading, loadData]);

    return scrollHandler;
};
