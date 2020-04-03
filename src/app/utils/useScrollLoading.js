import { useRef, useCallback } from 'react';
import getScrollToBottom from '../../helpers/getScrollToBottom';

export default ({ loading, loadData }) => {
    const scrollHandled = useRef(false);

    const scrollHandler = useCallback(() => {
        const scrollToBottom = getScrollToBottom();

        if (!loading && !scrollHandled.current && scrollToBottom < 200) {
            scrollHandled.current = true;
            loadData()
                .then(() => {
                    scrollHandled.current = false;
                });
        }
    }, [loading, loadData]);

    return scrollHandler;
};
