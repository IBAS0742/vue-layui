(function() {

    Vue.component('loading-icon-component',{
        render : function (h) {
            return h('div',{
                            style: {
                                position : 'absolute',
                                top : '0',
                                left : '0',
                                'z-index' : '10000',
                                width : '100%',
                                height : '100%',
                                'background-color' : 'rgba(0,0,0,.075)'
                            }
                        },[
                            h('div',{
                                style: {
                                    position : 'absolute',
                                    top : "50%",
                                    left : "50%",
                                    'z-index' : '20000000'
                                }
                            },[
                                h('svg', {
                                        attrs: {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: (this.rwidth),
                                            height: (this.rheight),
                                            viewBox: "0 0 " + this.rwidth + " " + this.rheight,
                                            fill: this.color
                                        }
                                    },[
                                        h("loading-icon-component-" + this.type)
                                    ]
                                )
                            ])
                        ]);
        },
        props : {
            type : {
                type : String,
                required : true
            },
            width : {
                type : Number,
                required : false
            },
            height : {
                type : Number,
                required : false
            },
            color : {
                type : String,
                required : true
            }
        },
        computed : {
            rwidth : function () {
                return this.width || 55;
            },
            rheight : function () {
                return this.height || 80;
            }
        }
    });

    loadingIconComponent_defaultParam = {
        audio : {
            type : "audio",
            width : 55,
            height : 80,
            color : "#5cbddd"
        },
        ring : {
            type : "ring",
            width : 45,
            height : 45,
            color : "#5cbddd"
        },
        grid : {
            type : "grid",
            width : 105,
            height : 105,
            color : "#5cbddd"
        },
        hearts : {
            type : "hearts",
            width : 140,
            height : 64,
            color : "#5cbddd"
        },
        oval : {
            type : "oval",
            width : 38,
            height : 38,
            color : "#5cbddd"
        },
        "three-dots" : {
            type : "three-dots",
            width : 120,
            height : 30,
            color : "#5cbddd"
        },
        "spinning-circles" : {
            type : "spinning-circles",
            width : 58,
            height : 58,
            color : "#5cbddd"
        },
        puff : {
            type : "puff",
            width : 44,
            height : 44,
            color : "#5cbddd"
        },
        circles1 : {
            type : "circles1",
            width : 135,
            height : 135,
            color : "#5cbddd"
        },
        circles2 : {
            type : "circles2",
            width : 135,
            height : 135,
            color : "#5cbddd"
        },
        bars : {
            type : "bars",
            width : 38,
            height : 38,
            color : "#5cbddd"
        },
        "ball-triangle" : {
            type : "ball-triangle",
            width : 57,
            height : 57,
            color : "#5cbddd"
        }
    };

    Vue.component('loading-icon-component-audio', {
            template:
                '\
                    <g transform="matrix(1 0 0 -1 0 80)">\
                        <rect width="10" height="22.077" rx="3">\
                            <animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite"/>\
                        </rect>\
                        <rect x="15" width="10" height="32.877" rx="3">\
                            <animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite"/>\
                        </rect>\
                        <rect x="30" width="10" height="65.3181" rx="3">\
                            <animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite"/>\
                        </rect>\
                        <rect x="45" width="10" height="70.4422" rx="3">\
                            <animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite"/>\
                        </rect>\
                    </g>\
                ',
            props: ['width','height','color'],//55,80,#fff
        }
    );
    Vue.component('loading-icon-component-ring', {
            template:
                '\
                    <g fill="" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">\
                        <circle cx="22" cy="22" r="11.6635" stroke-opacity="0">\
                            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/>\
                        </circle>\
                        <circle cx="22" cy="22" r="19.6635" stroke-opacity="0">\
                            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/>\
                        </circle>\
                        <circle cx="22" cy="22" r="4.24763">\
                            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"/>\
                        </circle>\
                </g>\
                '
        }
    );
    Vue.component('loading-icon-component-grid', {
            template:
                '<svg>\
                    <circle cx="12.5" cy="12.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">\
                        <animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="52.5" cy="12.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="52.5" cy="52.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="92.5" cy="12.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="92.5" cy="52.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="12.5" cy="92.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="52.5" cy="92.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="92.5" cy="92.5" r="12.5">\
                        <animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-hearts', {
            template:
                '<svg>\
                    <path d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5">\
                        <animate attributeName="fill-opacity" begin="0s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"/>\
                    </path>\
                    <path d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5">\
                        <animate attributeName="fill-opacity" begin="0.7s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"/>\
                    </path>\
                    <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"/>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-oval', {
            template:
                '\
                    <g fill="none" fill-rule="evenodd">\
                        <g transform="translate(1 1)" stroke-width="2">\
                            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>\
                            <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(5.95536 18 18)">\
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>\
                            </path>\
                        </g>\
                    </g>\
                '
        }
    );
    Vue.component('loading-icon-component-three-dots', {
            template:
                '<svg>\
                    <circle cx="15" cy="15" r="12.2468">\
                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>\
                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="60" cy="15" r="11.7532" fill-opacity="0.3">\
                        <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/>\
                        <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                    <circle cx="105" cy="15" r="12.2468">\
                        <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>\
                        <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>\
                    </circle>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-spinning-circles', {
            template:
                '\
                    <g fill="none" fill-rule="evenodd">\
                        <g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5">\
                            <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="1;0;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;1;0;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;1;0;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;1;0;0;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;1;0;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;1;0;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;1;0" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">\
                                <animate attributeName="fill-opacity" begin="0s" dur="1.3s" values="0;0;0;0;0;0;0;1" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                        </g>\
                    </g>\
                '
        }
    );
    Vue.component('loading-icon-component-puff', {
            template:
                '\
                    <g fill="none" fill-rule="evenodd" stroke-width="2">\
                        <circle cx="22" cy="22" r="18.4596">\
                            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>\
                        </circle>\
                        <circle cx="22" cy="22" r="1.86642">\
                            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>\
                            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>\
                        </circle>\
                    </g>\
                '
        }
    );
    Vue.component('loading-icon-component-circles1', {
            template:
                '<svg>\
                    <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z" transform="rotate(-143.935 67 67)">\
                        <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite"/>\
                    </path>\
                    <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z" transform="rotate(134.98 67 67)">\
                        <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite"/>\
                    </path>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-circles2', {
            template:
                '<svg>\
                    <defs>\
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">\
                            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>\
                            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>\
                            <stop stop-color="#fff" offset="100%"/>\
                        </linearGradient>\
                    </defs>\
                    <g fill="none" fill-rule="evenodd">\
                        <g transform="translate(1 1)">\
                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2" transform="rotate(19.8067 18 18)">\
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>\
                            </path>\
                            <circle fill="#fff" cx="36" cy="18" r="1" transform="rotate(19.8067 18 18)">\
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>\
                            </circle>\
                        </g>\
                    </g>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-bars', {
            template:
                '<svg>\
                    <defs>\
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">\
                            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>\
                            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>\
                            <stop stop-color="#fff" offset="100%"/>\
                        </linearGradient>\
                    </defs>\
                    <g fill="none" fill-rule="evenodd">\
                        <g transform="translate(1 1)">\
                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2" transform="rotate(213.296 18 18)">\
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>\
                            </path>\
                            <circle fill="#fff" cx="36" cy="18" r="1" transform="rotate(213.296 18 18)">\
                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>\
                            </circle>\
                        </g>\
                    </g>\
                </svg>'
        }
    );
    Vue.component('loading-icon-component-ball-triangle', {
            template:
                '\
                    <g fill="none" fill-rule="evenodd">\
                        <g transform="translate(1 1)" stroke-width="2">\
                            <circle cx="45.4821" cy="42.8043" r="5">\
                                <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"/>\
                                <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="12.0358" cy="50" r="5">\
                                <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"/>\
                                <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                            <circle cx="23.4821" cy="12.1957" r="5">\
                                <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"/>\
                                <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"/>\
                            </circle>\
                        </g>\
                    </g>\
                '
        }
    );
})()