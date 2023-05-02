import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';

const NIXIE_RAW = `
    <div class="nixie">
        <div class="nixie__wrapper">
            <div class="nixie__value"></div>
            <div class="nixie__mesh"></div>
        </div>
    </div>
`;

const INIT_DATA_ATTR = 'is-nixie-inited';

$.fn.nixie = function (options) {
    if (this.length) {
        this.each(function () {
            var opts = $.extend({}, $.fn.nixie.defaultState, options),
                $this = $(this),
                isInited = $this.data(INIT_DATA_ATTR),
                $nixie = $(NIXIE_RAW),
                thisText = $this.text(),
                thisClass,
                thisId;

            if ( ! opts.value && thisText) {
                opts.value = thisText;
            }

            if ( ! isInited) {
                if (thisClass = $this.attr('class')) {
                    $nixie.addClass(thisClass);
                }

                if (thisId = $this.attr('id')) {
                    $nixie.attr('id', thisId);
                }

                $this.replaceWith($nixie);
                $nixie.data(INIT_DATA_ATTR, true);
                $this = $nixie;
            }

            $.fn.nixie.setState.call($this, opts);
        });
    } else {
        return $.fn.nixie.setState.call($(nixie), $.extend({}, $.fn.nixie.defaultState, options));
    }

    return this;
};

$.fn.nixie.setState = function (state) {
    if (typeof state.value === 'string') {
        this.find('.nixie__value').text(state.value);
    }

    return this;
};

$.fn.nixie.defaultState = {
    value: ''
};

function Divergencemeter() {
    const nixieRef = useRef(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const formattedTime = `${time.getHours().toString().padStart(2, '0')}.${time.getMinutes().toString().padStart(2, '0')}.${time.getSeconds().toString().padStart(2, '0')}.${Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0')}`;

        $(nixieRef.current).nixie({ value: formattedTime });
    }, [time]);

    return (
        <div ref={nixieRef} className='DivergenceMeter'></div>
    );
}

export default Divergencemeter;
