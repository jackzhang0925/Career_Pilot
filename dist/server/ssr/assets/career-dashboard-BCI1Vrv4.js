import { a as require_react, t as require_jsx_runtime, u as __toESM } from "../index.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bell = createLucideIcon("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BriefcaseBusiness = createLucideIcon("briefcase-business", [
	["path", {
		d: "M12 12h.01",
		key: "1mp3jc"
	}],
	["path", {
		d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
		key: "1ksdt3"
	}],
	["path", {
		d: "M22 13a18.15 18.15 0 0 1-20 0",
		key: "12hx5q"
	}],
	["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "6",
		rx: "2",
		key: "i6l2r4"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock3 = createLucideIcon("clock-3", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6h4",
	key: "135r8i"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Funnel = createLucideIcon("funnel", [["path", {
	d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	key: "sc7q7i"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gauge = createLucideIcon("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Inbox = createLucideIcon("inbox", [["polyline", {
	points: "22 12 16 12 14 15 10 15 8 12 2 12",
	key: "o97t9d"
}], ["path", {
	d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	key: "oot6mr"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var KeyRound = createLucideIcon("key-round", [["path", {
	d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
	key: "1s6t7t"
}], ["circle", {
	cx: "16.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "w0ekpg"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutDashboard = createLucideIcon("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ListChecks = createLucideIcon("list-checks", [
	["path", {
		d: "M13 5h8",
		key: "a7qcls"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 19h8",
		key: "c3s6r1"
	}],
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["path", {
		d: "m3 7 2 2 4-4",
		key: "1obspn"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPin = createLucideIcon("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Route = createLucideIcon("route", [
	["circle", {
		cx: "6",
		cy: "19",
		r: "3",
		key: "1kj8tv"
	}],
	["path", {
		d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
		key: "1d8sl"
	}],
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Upload = createLucideIcon("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserRound = createLucideIcon("user-round", [["circle", {
	cx: "12",
	cy: "8",
	r: "5",
	key: "1hypcn"
}], ["path", {
	d: "M20 21a8 8 0 0 0-16 0",
	key: "rfgkzh"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
//#endregion
//#region node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url
var pdf_worker_min_default = "/assets/pdf.worker.min-FHbmGBN0.mjs";
//#endregion
//#region app/career-dashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
var defaultIdentity = {
	name: "Jack Zhang",
	location: "Toronto",
	focus: "Product Design"
};
var defaultLinkedIn = {
	enabled: false,
	keywords: "",
	location: "Toronto, Canada",
	workplace: "hybrid-remote",
	datePosted: "day",
	experience: ["4", "5"],
	employment: "F",
	easyApply: false,
	mostRecent: true
};
function linkedInSearchUrl(config) {
	const params = new URLSearchParams();
	if (config.keywords.trim()) params.set("keywords", config.keywords.trim());
	if (config.location.trim()) params.set("location", config.location.trim());
	if (config.datePosted === "day") params.set("f_TPR", "r86400");
	if (config.datePosted === "week") params.set("f_TPR", "r604800");
	if (config.datePosted === "month") params.set("f_TPR", "r2592000");
	if (config.workplace === "remote") params.set("f_WT", "2");
	if (config.workplace === "hybrid") params.set("f_WT", "3");
	if (config.workplace === "onsite") params.set("f_WT", "1");
	if (config.workplace === "hybrid-remote") params.set("f_WT", "2,3");
	if (config.experience.length) params.set("f_E", config.experience.join(","));
	if (config.employment) params.set("f_JT", config.employment);
	if (config.easyApply) params.set("f_AL", "true");
	if (config.mostRecent) params.set("sortBy", "DD");
	return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}
var seedJobs = [
	{
		id: 1,
		company: "Shopify",
		initials: "S",
		color: "#111111",
		role: "Senior Product Designer, AI",
		location: "Toronto, ON",
		mode: "远程",
		salary: "CA$145k–181k",
		score: 94,
		reason: "产品设计经验、AI 工作流和 B2B 背景高度匹配",
		tags: [
			"AI",
			"Design Systems",
			"B2B"
		],
		source: "Shopify Careers",
		url: "https://www.shopify.com/careers",
		posted: "2 小时前",
		status: "待确认"
	},
	{
		id: 2,
		company: "Cohere",
		initials: "C",
		color: "#39594d",
		role: "Product Designer",
		location: "Toronto, ON",
		mode: "混合",
		salary: "CA$130k–170k",
		score: 91,
		reason: "生成式 AI 产品经验与核心职责直接重合",
		tags: [
			"GenAI",
			"Research",
			"Prototyping"
		],
		source: "Ashby",
		url: "https://jobs.ashbyhq.com/cohere",
		posted: "今天",
		status: "待确认"
	},
	{
		id: 3,
		company: "Wealthsimple",
		initials: "W",
		color: "#6d5dfc",
		role: "Staff Product Designer",
		location: "Canada",
		mode: "远程",
		salary: "CA$151k–189k",
		score: 88,
		reason: "复杂产品和跨职能领导力是强项",
		tags: [
			"Fintech",
			"Mobile",
			"Strategy"
		],
		source: "Lever",
		url: "https://jobs.lever.co/wealthsimple",
		posted: "今天",
		status: "待确认"
	},
	{
		id: 4,
		company: "Stripe",
		initials: "S",
		color: "#635bff",
		role: "Product Designer, Growth",
		location: "Toronto, ON",
		mode: "混合",
		salary: "CA$154k–231k",
		score: 86,
		reason: "增长实验与设计系统能力匹配，行业经验略弱",
		tags: [
			"Growth",
			"Platform",
			"Systems"
		],
		source: "Stripe Jobs",
		url: "https://stripe.com/jobs/search?office_locations=North+America--Toronto",
		posted: "1 天前",
		status: "待确认"
	},
	{
		id: 5,
		company: "Clio",
		initials: "C",
		color: "#4b94c6",
		role: "Senior Product Designer",
		location: "Canada",
		mode: "远程",
		salary: "CA$128k–160k",
		score: 84,
		reason: "SaaS 端到端经验匹配，职级和薪资符合预期",
		tags: [
			"SaaS",
			"B2B",
			"UX"
		],
		source: "公司官网",
		url: "https://www.clio.com/about/careers/",
		posted: "1 天前",
		status: "待确认"
	},
	{
		id: 6,
		company: "Ada",
		initials: "A",
		color: "#ef755f",
		role: "Senior Product Designer, AI",
		location: "Toronto, ON",
		mode: "远程",
		salary: "CA$135k–165k",
		score: 82,
		reason: "对话式 AI 方向契合，需要补强企业客户案例",
		tags: ["Conversational AI", "B2B"],
		source: "公司官网",
		url: "https://www.ada.cx/careers",
		posted: "2 天前",
		status: "待确认"
	}
];
var nav = [
	{
		id: "overview",
		label: "今日雷达",
		icon: LayoutDashboard
	},
	{
		id: "jobs",
		label: "职位池",
		icon: BriefcaseBusiness,
		count: 38
	},
	{
		id: "queue",
		label: "申请队列",
		icon: ListChecks,
		count: 6
	},
	{
		id: "coach",
		label: "职业教练",
		icon: MessageCircle
	},
	{
		id: "materials",
		label: "材料库",
		icon: FileText
	}
];
function CareerDashboard() {
	const [active, setActive] = (0, import_react.useState)("overview");
	const [jobs, setJobs] = (0, import_react.useState)(seedJobs);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [currentProfile, setCurrentProfile] = (0, import_react.useState)(defaultProfile);
	const [scanStats, setScanStats] = (0, import_react.useState)({
		scanned: seedJobs.length,
		sources: 0,
		fetchedAt: null,
		failures: [],
		isDemo: true
	});
	const [identity, setIdentity] = (0, import_react.useState)(defaultIdentity);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [showApiTest, setShowApiTest] = (0, import_react.useState)(false);
	const [linkedInConfig, setLinkedInConfig] = (0, import_react.useState)(defaultLinkedIn);
	const scanRequest = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("cat-career-jobs");
		if (saved) try {
			setJobs(JSON.parse(saved).map((job) => ({
				...seedJobs.find((seed) => seed.id === job.id),
				...job
			})));
		} catch {
			localStorage.removeItem("cat-career-jobs");
		}
		const savedScanStats = localStorage.getItem("cat-career-scan-stats");
		if (savedScanStats) try {
			setScanStats({
				scanned: seedJobs.length,
				sources: 0,
				fetchedAt: null,
				failures: [],
				isDemo: true,
				...JSON.parse(savedScanStats)
			});
		} catch {
			localStorage.removeItem("cat-career-scan-stats");
		}
		const savedProfile = localStorage.getItem("cat-career-profile");
		if (savedProfile) try {
			setCurrentProfile({
				...defaultProfile,
				...JSON.parse(savedProfile)
			});
		} catch {
			localStorage.removeItem("cat-career-profile");
		}
		const savedIdentity = localStorage.getItem("cat-career-identity");
		if (savedIdentity) try {
			setIdentity({
				...defaultIdentity,
				...JSON.parse(savedIdentity)
			});
		} catch {
			localStorage.removeItem("cat-career-identity");
		}
		const savedLinkedIn = localStorage.getItem("cat-career-linkedin");
		if (savedLinkedIn) try {
			setLinkedInConfig({
				...defaultLinkedIn,
				...JSON.parse(savedLinkedIn)
			});
		} catch {
			localStorage.removeItem("cat-career-linkedin");
		}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) localStorage.setItem("cat-career-jobs", JSON.stringify(jobs));
	}, [hydrated, jobs]);
	const visibleJobs = (0, import_react.useMemo)(() => jobs.filter((job) => `${job.company} ${job.role} ${job.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [jobs, query]);
	function updateStatus(id, status) {
		setJobs((current) => current.map((job) => job.id === id ? {
			...job,
			status
		} : job));
		setSelected((current) => current?.id === id ? {
			...current,
			status
		} : current);
		setNotice(status === "已加入" ? "已加入申请队列，最终提交前仍需你确认。" : status === "已跳过" ? "已从今日推荐中跳过。" : "已恢复为待确认状态。");
		window.setTimeout(() => setNotice(null), 2600);
	}
	async function scanForProfile(profile, profileChanged = false, silent = false) {
		scanRequest.current?.controller.abort();
		const request = {
			id: (scanRequest.current?.id || 0) + 1,
			controller: new AbortController()
		};
		scanRequest.current = request;
		setRunning(true);
		if (profileChanged) {
			setJobs((current) => current.filter((job) => job.status === "已加入" || job.source === "LinkedIn · 用户导入").map((job) => {
				if (job.source !== "LinkedIn · 用户导入" || !job.description) return job;
				return {
					...buildImportedLinkedInJob({
						company: job.company,
						role: job.role,
						location: job.location,
						url: job.url,
						description: job.description
					}, profile),
					id: job.id,
					status: job.status
				};
			}));
			setActive("overview");
			setNotice("新画像已保存，正在重新扫描真实职位…");
		}
		try {
			const savedSources = localStorage.getItem("cat-career-sources");
			let sources = [
				"Greenhouse",
				"Lever",
				"Ashby"
			];
			if (savedSources) try {
				const enabled = JSON.parse(savedSources);
				sources = sources.filter((source) => enabled[source] !== false);
			} catch {
				localStorage.removeItem("cat-career-sources");
			}
			const response = await fetch("/api/scan-jobs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...profile,
					sources
				}),
				signal: request.controller.signal,
				cache: "no-store"
			});
			const result = await response.json();
			if (!response.ok || !result.jobs) throw new Error(result.error || "职位扫描失败");
			if (scanRequest.current?.id !== request.id) return;
			setJobs((current) => {
				const currentByUrl = new Map(current.map((job) => [job.url, job]));
				const refreshed = result.jobs.map((job) => ({
					...job,
					status: currentByUrl.get(job.url)?.status || job.status
				}));
				const returnedUrls = new Set(refreshed.map((job) => job.url));
				const preservedLocal = current.filter((job) => (job.status === "已加入" || job.source === "LinkedIn · 用户导入") && !returnedUrls.has(job.url));
				return [...refreshed, ...preservedLocal];
			});
			setSelected((current) => current ? result.jobs.find((job) => job.url === current.url) || current : null);
			const nextStats = {
				scanned: result.scanned || 0,
				sources: result.sources || 0,
				fetchedAt: result.fetchedAt || (/* @__PURE__ */ new Date()).toISOString(),
				failures: result.failures || [],
				isDemo: false
			};
			setScanStats(nextStats);
			localStorage.setItem("cat-career-scan-stats", JSON.stringify(nextStats));
			if (!silent) setNotice(`刷新完成：从 ${nextStats.sources} 个公开职位板读取 ${nextStats.scanned} 个岗位${nextStats.failures.length ? `；${nextStats.failures.length} 个来源暂时不可用` : ""}。`);
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;
			if (!silent) setNotice(profileChanged ? "旧推荐已失效，但实时职位刷新暂时不可用。请稍后重试。" : error instanceof Error ? error.message : "职位刷新暂时不可用，请稍后重试。");
		} finally {
			if (scanRequest.current?.id === request.id) {
				setRunning(false);
				if (!silent) window.setTimeout(() => setNotice(null), 3200);
			}
		}
	}
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		scanForProfile(currentProfile, false, true);
		const refresh = () => {
			if (document.visibilityState === "visible") scanForProfile(currentProfile, false, true);
		};
		const timer = window.setInterval(refresh, 300 * 1e3);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", refresh);
			scanRequest.current?.controller.abort();
		};
	}, [hydrated]);
	function runScan() {
		scanForProfile(currentProfile);
	}
	function handleProfileChanged(profile) {
		setCurrentProfile(profile);
		scanForProfile(profile, true);
	}
	function updateIdentity(next) {
		setIdentity(next);
		localStorage.setItem("cat-career-identity", JSON.stringify(next));
	}
	function importLinkedInJob(input) {
		const job = buildImportedLinkedInJob(input, currentProfile);
		setJobs((current) => [job, ...current.filter((existing) => existing.url !== job.url)]);
		setActive("jobs");
		setNotice(`已导入并评分：${job.company} · ${job.role}（${job.score} 分）`);
		window.setTimeout(() => setNotice(null), 3600);
	}
	function removeImportedJob(id) {
		setJobs((current) => current.filter((job) => job.id !== id));
		setSelected(null);
		setNotice("已从本地职位池移除用户导入的 LinkedIn 职位。");
		window.setTimeout(() => setNotice(null), 2800);
	}
	const queued = jobs.filter((job) => job.status === "已加入").length;
	const reviewed = jobs.filter((job) => job.status === "已加入" || job.status === "已跳过").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "brand-mark",
							children: "猫"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "猫猫王求职" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CAREER COPILOT" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "primary-nav",
						"aria-label": "主导航",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "工作台" }),
							nav.map(({ id, label, icon: Icon, count }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: active === id ? "active" : "",
								onClick: () => setActive(id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 18,
										strokeWidth: 1.8
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
									count && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: id === "queue" ? queued : id === "jobs" ? jobs.length : count })
								]
							}, id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "个人设置" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: active === "profile" ? "active" : "",
								onClick: () => setActive("profile"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "求职画像" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: active === "sources" ? "active" : "",
								onClick: () => setActive("sources"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "职位来源" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: active === "settings" ? "active" : "",
								onClick: () => setActive("settings"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "自动化设置" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "privacy-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "数据留在本机" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "简历和申请记录默认不上传" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "user-card",
						onClick: () => setActive("settings"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "avatar",
								children: identity.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: identity.name || "未设置姓名" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [identity.location, identity.focus].filter(Boolean).join(" · ") || "完善个人信息" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 18 })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "topbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "搜索职位",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "搜索职位、公司或技能…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "⌘ K" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "top-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "帮助",
								onClick: () => setActive("coach"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { size: 19 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "通知",
								className: "notification",
								onClick: () => {
									setNotice(scanStats.failures.length ? `${scanStats.failures.length} 个职位来源暂时不可用，健康来源仍已更新。` : "没有新的系统通知，职位数据会在页面可见时自动刷新。");
									window.setTimeout(() => setNotice(null), 3200);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 19 }), scanStats.failures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "api-test-button",
								"aria-label": "本地 API 测试",
								title: "本地 API 测试",
								onClick: () => setShowApiTest(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "scan-button",
								onClick: runScan,
								disabled: running,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
									size: 16,
									fill: "currentColor"
								}), running ? "正在扫描…" : "立即扫描"]
							})
						]
					})]
				}), active === "overview" || active === "jobs" || active === "queue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardContent, {
					jobs: visibleJobs,
					queued,
					reviewed,
					active,
					running,
					scanStats,
					linkedIn: linkedInConfig,
					userName: identity.name,
					setSelected,
					updateStatus,
					runScan,
					onViewAll: () => setActive("jobs"),
					onOpenSources: () => setActive("sources")
				}) : active === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePanel, {
					onProfileChanged: handleProfileChanged,
					onOpenCoach: () => setActive("coach")
				}) : active === "coach" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerCoachPanel, { onOpenProfile: () => setActive("profile") }) : active === "materials" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaterialsPanel, {
					jobs,
					onOpenProfile: () => setActive("profile"),
					onOpenQueue: () => setActive("queue")
				}) : active === "sources" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcesPanel, {
					onRefresh: runScan,
					onLinkedInChange: setLinkedInConfig,
					onLinkedInImport: importLinkedInJob
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutomationPanel, {
					identity,
					onIdentityChange: updateIdentity
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobDrawer, {
				job: selected,
				onClose: () => setSelected(null),
				onStatus: updateStatus,
				onRemoveImported: removeImportedJob
			}),
			showApiTest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalApiKeyDialog, {
				onClose: () => setShowApiTest(false),
				onOpenCoach: () => {
					setShowApiTest(false);
					setActive("coach");
				}
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), notice]
			})
		]
	});
}
function LocalApiKeyDialog({ onClose, onOpenCoach }) {
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [model, setModel] = (0, import_react.useState)("gpt-5.6-sol");
	const [configured, setConfigured] = (0, import_react.useState)(false);
	const [localRequest, setLocalRequest] = (0, import_react.useState)(true);
	const [state, setState] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		fetch("/api/openai-key", { cache: "no-store" }).then((response) => response.json()).then((result) => {
			setConfigured(Boolean(result.configured));
			setLocalRequest(Boolean(result.localRequest));
			if (result.model) setModel(result.model);
		}).catch(() => {
			setState("error");
			setMessage("无法读取本地 API 状态。");
		});
		const closeOnEscape = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [onClose]);
	async function validateKey() {
		if (!apiKey.trim()) {
			setState("error");
			setMessage("请输入 API Key。");
			return;
		}
		setState("checking");
		setMessage("正在验证 Key 与模型权限…");
		try {
			const response = await fetch("/api/openai-key", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					apiKey: apiKey.trim(),
					model: model.trim()
				})
			});
			const result = await response.json();
			if (!response.ok || !result.valid) throw new Error(result.error || "验证失败。");
			setApiKey("");
			setConfigured(true);
			setState("ready");
			setMessage(`验证成功，${result.model || model} 已可用于当前本地服务会话。`);
		} catch (error) {
			setState("error");
			setMessage(error instanceof Error ? error.message : "验证失败，请检查 Key 和网络。");
		}
	}
	async function removeKey() {
		const response = await fetch("/api/openai-key", { method: "DELETE" });
		const result = await response.json();
		if (!response.ok) {
			setState("error");
			setMessage(result.error || "移除失败。");
			return;
		}
		setConfigured(Boolean(result.configured));
		setState("idle");
		setMessage(result.configured ? "临时 Key 已移除；服务端环境变量仍提供 API Key。" : "临时 API Key 已从当前本地服务会话移除。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "api-test-layer",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "api-test-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "api-test-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "api-test-close",
					"aria-label": "关闭本地 API 测试",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "api-test-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 22 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "api-test-title",
						children: "本地 API Key 测试"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "安全验证后，直接测试简历分析和职业教练。" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "api-safety-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "只用于当前本地服务进程" }), "Key 不写入 localStorage、Cookie、文件或 Git；重启服务或点击移除后即清除。验证请求会直接发送到 OpenAI。"] })]
				}),
				!localRequest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "api-test-error",
					children: "此窗口只允许在 localhost 或 127.0.0.1 使用。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["OpenAI API Key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoComplete: "off",
					value: apiKey,
					onChange: (event) => setApiKey(event.target.value),
					placeholder: "sk-…",
					disabled: !localRequest
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["模型 ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: model,
					onChange: (event) => setModel(event.target.value),
					placeholder: "gpt-5.6-sol",
					disabled: !localRequest
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "api-test-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary",
							disabled: !localRequest || state === "checking",
							onClick: () => void validateKey(),
							children: state === "checking" ? "验证中…" : "验证并用于本次会话"
						}),
						configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-action",
							onClick: onOpenCoach,
							children: "打开职业教练测试"
						}),
						configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-action danger",
							onClick: () => void removeKey(),
							children: "移除临时 Key"
						})
					]
				}),
				message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `api-test-message ${state === "error" ? "error" : state === "ready" ? "ready" : ""}`,
					"aria-live": "polite",
					children: message
				})
			]
		})
	});
}
function DashboardContent({ jobs, queued, reviewed, active, running, scanStats, linkedIn, userName, setSelected, updateStatus, runScan, onViewAll, onOpenSources }) {
	const [highOnly, setHighOnly] = (0, import_react.useState)(false);
	const [sortMode, setSortMode] = (0, import_react.useState)("score");
	const highMatches = jobs.filter((job) => job.score >= 80);
	const shown = [...active === "queue" ? jobs.filter((j) => j.status === "已加入") : active === "overview" ? highMatches.slice(0, 10) : highOnly ? highMatches : jobs].sort((a, b) => sortMode === "company" ? a.company.localeCompare(b.company) : b.score - a.score);
	const acceptanceRate = reviewed > 0 ? Math.round(queued / reviewed * 100) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						suppressHydrationWarning: true,
						children: new Intl.DateTimeFormat("zh-CN", {
							weekday: "long",
							month: "long",
							day: "numeric"
						}).format(/* @__PURE__ */ new Date())
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: active === "queue" ? "申请队列" : active === "jobs" ? "全部职位" : `早上好，${userName.trim().split(/\s+/)[0] || "朋友"}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: active === "queue" ? "检查材料，准备好后再进入投递步骤。" : running ? "正在从公开职位板获取最新岗位，已有结果会保留到刷新完成。" : "下面是根据最新公开职位数据筛选出的优先机会。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "next-run",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: running ? "实时刷新中" : "数据状态" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scanStats.isDemo ? "演示数据" : scanStats.fetchedAt ? `更新于 ${new Date(scanStats.fetchedAt).toLocaleTimeString("zh-CN", {
						hour: "2-digit",
						minute: "2-digit"
					})}` : "等待刷新" })] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stats-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stat-icon coral",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "本次扫描职位" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scanStats.scanned }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: scanStats.isDemo ? "首次实时刷新后替换演示数据" : `来自 ${scanStats.sources} 个公开职位板` })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stat-icon violet",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "高匹配推荐" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: highMatches.length }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "匹配度 80% 以上" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stat-icon green",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "待确认申请" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: queued }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "提交前由你审核" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stat-icon blue",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "推荐采纳率" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: acceptanceRate === null ? "—" : `${acceptanceRate}%` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: reviewed > 0 ? `已采纳 ${queued} / 已审阅 ${reviewed}` : "审阅推荐后自动计算" })
						] })]
					})
				]
			}),
			active !== "queue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "radar-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "radar-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "radar-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pill",
							children: "今日任务"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: running ? "正在按最新画像重新扫描…" : `${highMatches.length} 个机会，已经按当前简历排好优先级` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "综合目标职位、地点偏好和岗位描述实时评分。更换简历后会清除旧结果并重新扫描。" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pipeline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: scanStats.scanned }), " 已抓取"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: jobs.length }), " 进入职位池"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: highMatches.length }), " 高匹配"] })
							]
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: runScan,
					disabled: running,
					children: [running ? "分析中…" : "重新扫描", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
				})]
			}),
			active !== "queue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `linkedin-dashboard-card ${linkedIn.enabled ? "configured" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "linkedin-dashboard-logo",
						children: "in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-dashboard-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LINKEDIN JOBS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: linkedIn.enabled ? linkedIn.keywords || "LinkedIn 职位搜索" : "把 LinkedIn 搜索加入 Dashboard" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: linkedIn.enabled ? `${linkedIn.location || "不限地点"} · ${linkedIn.datePosted === "day" ? "过去 24 小时" : linkedIn.datePosted === "week" ? "过去一周" : linkedIn.datePosted === "month" ? "过去一个月" : "不限时间"}${linkedIn.easyApply ? " · Easy Apply" : ""}` : "保存关键词与地点后，这里会固定显示你的 LinkedIn 搜索入口。" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "linkedin-dashboard-status",
						children: linkedIn.enabled ? "已显示在 Dashboard" : "未配置"
					}),
					linkedIn.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: linkedInSearchUrl(linkedIn),
						target: "_blank",
						rel: "noreferrer",
						children: ["查看 LinkedIn 职位", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 15 })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenSources,
						children: ["配置 LinkedIn", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-dashboard-boundary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "LinkedIn 职位页由 LinkedIn 提供；当前应用不抓取登录数据。"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "jobs-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: active === "queue" ? `待确认申请 · ${shown.length}` : "今日最佳匹配" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: active === "queue" ? "系统只会准备材料，不会未经确认点击最终提交。" : running ? "正在同步最新结果…" : scanStats.fetchedAt ? `最新数据 · ${new Date(scanStats.fetchedAt).toLocaleString("zh-CN")}` : "等待首次实时刷新" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "filter-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setHighOnly((current) => !current),
								"aria-pressed": highOnly,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { size: 16 }), highOnly ? "仅 80+" : "全部分数"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSortMode((current) => current === "score" ? "company" : "score"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 16 }),
									"排序：",
									sortMode === "score" ? "匹配度" : "公司",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "jobs-table",
						role: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "table-head",
							role: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "公司 / 职位" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "地点" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "薪资范围" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "匹配度" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "状态" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							]
						}), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { size: 28 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: running ? "正在刷新推荐" : active === "queue" ? "队列还是空的" : "当前画像暂无 80 分以上职位" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: running ? "正在读取公开职位板并按新简历重新评分。" : active === "queue" ? "在职位右侧点击“加入”，合适的机会就会出现在这里。" : "你仍可在职位池查看较低匹配岗位，或点击重新扫描。" })
							]
						}) : shown.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "job-row",
							role: "row",
							onClick: () => setSelected(job),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "job-main",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "company-logo",
										style: { background: job.color },
										children: job.initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: job.role }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											job.company,
											" · ",
											job.source,
											" · ",
											job.posted
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "tags",
											children: job.tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: tag }, tag))
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "muted-cell",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [job.location, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: job.mode })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "salary",
									children: [job.salary, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "估算年薪" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "score",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: { "--score": `${job.score}%` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: job.score })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: job.score >= 90 ? "极佳" : job.score >= 85 ? "优秀" : "很合适" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `status ${job.status}`,
									children: job.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row-actions",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "external-job-link",
										href: job.url,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": `打开 ${job.company} 原岗位`,
										title: "查看原岗位",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 })
									}), job.status === "待确认" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "approve",
										"aria-label": "加入队列",
										onClick: () => updateStatus(job.id, "已加入"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": "跳过",
										onClick: () => updateStatus(job.id, "已跳过"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "more",
										"aria-label": "恢复为待确认",
										title: "恢复为待确认",
										onClick: () => updateStatus(job.id, "待确认"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { size: 18 })
									})]
								})
							]
						}, job.id))]
					}),
					active === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "view-all",
						onClick: onViewAll,
						children: [
							"查看全部 ",
							jobs.length,
							" 个合格职位 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })
						]
					})
				]
			})
		]
	});
}
var defaultProfile = {
	roleKeywords: "Senior Product Designer, Staff Product Designer",
	location: "Toronto, Canada Remote",
	minSalary: "CA$130,000",
	workMode: "hybrid"
};
function buildImportedLinkedInJob(input, profile) {
	const ignored = new Set([
		"senior",
		"staff",
		"lead",
		"principal",
		"manager",
		"and",
		"the",
		"for",
		"product",
		"with",
		"you",
		"your"
	]);
	const tokenize = (value) => [...new Set(value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((token) => token.length > 2 && !ignored.has(token)))];
	const targets = profile.roleKeywords.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
	const targetTokens = tokenize(targets.join(" "));
	const candidateTokens = tokenize(`${input.role} ${input.description}`);
	const overlap = targetTokens.filter((token) => candidateTokens.includes(token));
	const exactRole = targets.some((target) => input.role.toLowerCase().includes(target.toLowerCase()) || target.toLowerCase().includes(input.role.toLowerCase()));
	const locationMatch = profile.location.toLowerCase().split(/[,\s]+/).filter((part) => part.length > 3).some((part) => input.location.toLowerCase().includes(part));
	const score = Math.max(35, Math.min(97, 48 + (exactRole ? 30 : 0) + Math.min(15, overlap.length * 5) + (locationMatch ? 4 : 0)));
	const reason = exactRole ? `用户导入的职位名称与目标画像直接重合${locationMatch ? "，地点也符合偏好" : ""}` : overlap.length ? `用户导入的职位与目标关键词重合：${overlap.slice(0, 3).join("、")}` : "用户导入的职位与当前画像关联较弱，建议人工复核完整描述";
	return {
		id: Date.now(),
		company: input.company.trim(),
		initials: input.company.trim().slice(0, 1).toUpperCase() || "L",
		color: "#0a66c2",
		role: input.role.trim(),
		location: input.location.trim(),
		mode: /remote|远程/i.test(`${input.location} ${input.description}`) ? "远程" : "职位页查看",
		salary: "职位页查看",
		score,
		reason,
		tags: overlap.slice(0, 3).map((tag) => tag.replace(/^./, (letter) => letter.toUpperCase())),
		source: "LinkedIn · 用户导入",
		url: input.url.trim(),
		posted: "刚刚导入",
		status: "待确认",
		description: input.description.trim()
	};
}
function inferRolesLocally(text) {
	const normalized = text.toLowerCase();
	if (/product owner|产品负责人/.test(normalized)) return [
		"Senior Product Owner",
		"Product Owner",
		"Product Manager"
	];
	if (/product design|ux designer|ui\/ux|用户体验/.test(normalized)) return [
		"Senior Product Designer",
		"Product Designer",
		"UX Designer"
	];
	if (/product manager|产品经理/.test(normalized)) return [
		"Senior Product Manager",
		"Product Manager",
		"Technical Product Manager"
	];
	if (/software engineer|developer|软件工程/.test(normalized)) return [
		"Senior Software Engineer",
		"Software Engineer",
		"Full Stack Engineer"
	];
	if (/data scientist|machine learning|数据科学/.test(normalized)) return [
		"Data Scientist",
		"Machine Learning Engineer",
		"Applied Scientist"
	];
	if (/data analyst|business intelligence|数据分析/.test(normalized)) return [
		"Senior Data Analyst",
		"Data Analyst",
		"Business Intelligence Analyst"
	];
	if (/marketing|growth|市场营销/.test(normalized)) return [
		"Growth Marketing Manager",
		"Product Marketing Manager",
		"Marketing Manager"
	];
	if (/project manager|项目经理/.test(normalized)) return [
		"Senior Project Manager",
		"Project Manager",
		"Program Manager"
	];
	return [
		"Senior Specialist",
		"Program Manager",
		"Operations Manager"
	];
}
async function extractResumeText(file) {
	const extension = file.name.split(".").pop()?.toLowerCase();
	if (extension === "txt" || extension === "md") return file.text();
	if (extension === "docx") return (await (await import("./lib-BTjZJiKI.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1))).extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
	if (extension === "pdf") {
		const pdfjs = await import("./pdf-D4p8JGje.js");
		pdfjs.GlobalWorkerOptions.workerSrc = pdf_worker_min_default;
		const document = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
		const pages = [];
		for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
			const content = await (await document.getPage(pageNumber)).getTextContent();
			pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
		}
		return pages.join("\n\n");
	}
	throw new Error("请选择 PDF、DOCX、TXT 或 Markdown 文件。 ");
}
function ProfilePanel({ onProfileChanged, onOpenCoach }) {
	const inputRef = (0, import_react.useRef)(null);
	const [resume, setResume] = (0, import_react.useState)(null);
	const [uploadState, setUploadState] = (0, import_react.useState)("idle");
	const [uploadError, setUploadError] = (0, import_react.useState)("");
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(defaultProfile);
	const [profileNotice, setProfileNotice] = (0, import_react.useState)("");
	const [analysisState, setAnalysisState] = (0, import_react.useState)("idle");
	const [analysisMessage, setAnalysisMessage] = (0, import_react.useState)("");
	const [apiConfigured, setApiConfigured] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("cat-career-resume");
		let importedResume = null;
		let importedProfile = defaultProfile;
		if (saved) try {
			importedResume = JSON.parse(saved);
			setResume(importedResume);
		} catch {
			localStorage.removeItem("cat-career-resume");
		}
		const savedProfile = localStorage.getItem("cat-career-profile");
		if (savedProfile) try {
			importedProfile = {
				...defaultProfile,
				...JSON.parse(savedProfile)
			};
			setProfile(importedProfile);
		} catch {
			localStorage.removeItem("cat-career-profile");
		}
		fetch("/api/analyze-resume").then((response) => response.json()).then((data) => {
			const configured = Boolean(data.configured);
			const analysisSource = localStorage.getItem("cat-career-profile-analysis-source");
			setApiConfigured(configured);
			if (importedResume && (!savedProfile || configured && analysisSource !== "ai" && analysisSource !== "manual")) analyzeResume(importedResume.text, importedProfile);
		}).catch(() => {
			setApiConfigured(false);
			if (importedResume && !savedProfile) analyzeResume(importedResume.text, importedProfile);
		});
	}, []);
	async function analyzeResume(text, baseProfile = profile) {
		setAnalysisState("analyzing");
		setAnalysisMessage("正在根据简历分析目标职位…");
		try {
			const response = await fetch("/api/analyze-resume", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ resumeText: text })
			});
			if (!response.ok) throw new Error(response.status === 503 ? "not-configured" : "api-error");
			const analysis = await response.json();
			const updated = {
				...baseProfile,
				roleKeywords: analysis.roles.join(", ")
			};
			setProfile(updated);
			localStorage.setItem("cat-career-profile", JSON.stringify(updated));
			localStorage.setItem("cat-career-profile-analysis-source", "ai");
			onProfileChanged(updated);
			setAnalysisMessage(`AI 已根据简历推荐：${analysis.roles.join("、")}`);
			setApiConfigured(true);
		} catch (error) {
			const roles = inferRolesLocally(text);
			const updated = {
				...baseProfile,
				roleKeywords: roles.join(", ")
			};
			setProfile(updated);
			localStorage.setItem("cat-career-profile", JSON.stringify(updated));
			localStorage.setItem("cat-career-profile-analysis-source", "local");
			onProfileChanged(updated);
			setAnalysisMessage(error instanceof Error && error.message === "not-configured" ? `已用本地规则推荐：${roles.join("、")}。配置 API key 后可重新精细分析。` : `AI 暂时不可用，已用本地规则推荐：${roles.join("、")}`);
		} finally {
			setAnalysisState("idle");
		}
	}
	async function handleFile(file) {
		if (!file) return;
		setUploadError("");
		if (file.size > 10 * 1024 * 1024) {
			setUploadState("error");
			setUploadError("文件超过 10 MB，请上传精简后的简历。");
			return;
		}
		setUploadState("reading");
		try {
			const text = (await extractResumeText(file)).replace(/\s+\n/g, "\n").trim();
			if (text.length < 80) throw new Error("没有读到足够的文字；如果是扫描版 PDF，请先进行 OCR。");
			const saved = {
				name: file.name,
				size: file.size,
				text,
				importedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			localStorage.setItem("cat-career-resume", JSON.stringify(saved));
			setResume(saved);
			await analyzeResume(text);
			setUploadState("idle");
			onOpenCoach();
		} catch (error) {
			setUploadState("error");
			setUploadError(error instanceof Error ? error.message : "无法读取这个文件，请尝试其他格式。");
		}
	}
	function removeResume() {
		localStorage.removeItem("cat-career-resume");
		setResume(null);
		setUploadError("");
		if (inputRef.current) inputRef.current.value = "";
	}
	function saveProfile() {
		localStorage.setItem("cat-career-profile", JSON.stringify(profile));
		localStorage.setItem("cat-career-profile-analysis-source", "manual");
		onProfileChanged(profile);
		setProfileNotice("画像已保存到本机");
		window.setTimeout(() => setProfileNotice(""), 2500);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content narrow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "page-heading",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "PERSONAL CONTEXT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "求职画像" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "管理目标职位、地点、薪资和工作偏好；主简历只作为画像分析依据。" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "settings-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `panel resume-drop ${dragging ? "dragging" : ""} ${resume ? "has-resume" : ""}`,
				onDragOver: (event) => {
					event.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (event) => {
					event.preventDefault();
					setDragging(false);
					handleFile(event.dataTransfer.files[0]);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						className: "file-input",
						type: "file",
						accept: ".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain",
						onChange: (event) => void handleFile(event.target.files?.[0])
					}),
					resume ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "large-icon success",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 25 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "画像依据已导入" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resume-file",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: resume.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								(resume.size / 1024).toFixed(0),
								" KB · 已读取 ",
								resume.text.length.toLocaleString(),
								" 个字符"
							] })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "这里用简历提取求职画像；文件版本和定制材料请到“材料库”管理。" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resume-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => inputRef.current?.click(),
								children: "更换文件"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary",
								onClick: removeResume,
								children: "移除"
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "large-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 25 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: uploadState === "reading" ? "正在读取简历…" : dragging ? "松开即可导入" : "导入你的主简历" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "支持 PDF、DOCX、TXT 或 Markdown。也可以把文件直接拖到这里。" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: uploadState === "reading",
							onClick: () => inputRef.current?.click(),
							children: uploadState === "reading" ? "解析中…" : "选择简历文件"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "最大 10 MB · 文件保存在本机；启用 AI 时文字会发送到配置的 OpenAI API" })
					] }),
					uploadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "upload-error",
						children: uploadError
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel form-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "目标职位" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `api-status ${apiConfigured ? "ready" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), apiConfigured === null ? "检查 AI 配置" : apiConfigured ? "AI 已连接" : "AI 未配置"]
						})] }), resume && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "analyze-button",
							disabled: analysisState === "analyzing",
							onClick: () => void analyzeResume(resume.text),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), analysisState === "analyzing" ? "分析中…" : "重新分析简历"]
						})]
					}),
					analysisMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "analysis-message",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: analysisMessage })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["职位关键词", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.roleKeywords,
						onChange: (event) => setProfile({
							...profile,
							roleKeywords: event.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["地点", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.location,
						onChange: (event) => setProfile({
							...profile,
							location: event.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "two-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["最低年薪", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.minSalary,
							onChange: (event) => setProfile({
								...profile,
								minSalary: event.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["工作方式", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: profile.workMode,
							onChange: (event) => setProfile({
								...profile,
								workMode: event.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "hybrid",
									children: "远程或混合"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "remote",
									children: "仅远程"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "onsite",
									children: "接受现场办公"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "save-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary",
							onClick: saveProfile,
							children: "保存画像"
						}), profileNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), profileNotice] })]
					}),
					apiConfigured === false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "api-hint",
						children: [
							"要启用 AI 自动分析，请在项目的 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ".env.local" }),
							" 中设置 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "OPENAI_API_KEY" }),
							"，然后重启本地服务。"
						]
					})
				]
			})]
		})]
	});
}
function buildLocalRoadmap(target) {
	const role = target || "目标职位";
	return [
		{
			title: "确认方向与差距",
			duration: "第 1–2 周",
			outcomes: [`拆解 10 个真实 ${role} 职位描述`, "标记已有证据、待验证经验和技能缺口"],
			project: "产出一页能力差距表，并选择一个最想解决的真实问题。"
		},
		{
			title: "补齐核心能力",
			duration: "第 3–6 周",
			outcomes: ["完成 1 门针对最高优先级缺口的课程", "每周用小练习验证知识，而不是只看课程"],
			project: `完成一个贴近 ${role} 日常工作的迷你项目。`
		},
		{
			title: "做出可展示案例",
			duration: "第 7–10 周",
			outcomes: ["记录问题、约束、决策、迭代和结果", "邀请 2 位从业者给出反馈并完成一次迭代"],
			project: "发布一个包含过程证据与复盘的作品案例。"
		},
		{
			title: "进入市场验证",
			duration: "第 11–12 周",
			outcomes: ["更新简历与个人资料中的可迁移证据", "完成 3 次信息访谈和 2 次模拟面试"],
			project: `用定向申请验证 ${role} 方向，并根据反馈调整下一轮计划。`
		}
	];
}
function CareerCoachPanel({ onOpenProfile }) {
	const [resume] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return null;
		try {
			return JSON.parse(localStorage.getItem("cat-career-resume") || "null");
		} catch {
			return null;
		}
	});
	const [target, setTarget] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "";
		try {
			return localStorage.getItem("cat-career-coach-target") || JSON.parse(localStorage.getItem("cat-career-profile") || "null")?.roleKeywords?.split(",")[0]?.trim() || "";
		} catch {
			return "";
		}
	});
	const [messages, setMessages] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return [];
		try {
			return JSON.parse(localStorage.getItem("cat-career-coach-messages") || "[]");
		} catch {
			return [];
		}
	});
	const [roadmap, setRoadmap] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return [];
		try {
			return JSON.parse(localStorage.getItem("cat-career-coach-roadmap") || "[]");
		} catch {
			return [];
		}
	});
	const [draft, setDraft] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [coachMode, setCoachMode] = (0, import_react.useState)(null);
	const messagesEnd = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!resume || messages.length) return;
		const roles = inferRolesLocally(resume.text);
		setMessages([{
			id: crypto.randomUUID(),
			role: "assistant",
			content: `我已读取《${resume.name}》。从明确出现的经历看，你可能适合 ${roles.slice(0, 2).join(" 或 ")}。不过职位名称并不能说明你真正喜欢什么：你最有成就感的一个项目是什么？你在其中亲自做了哪些决定，又产生了什么结果？`
		}]);
		setRoadmap(buildLocalRoadmap(target || roles[0]));
		setCoachMode("local");
	}, [resume]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("cat-career-coach-messages", JSON.stringify(messages));
		messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("cat-career-coach-roadmap", JSON.stringify(roadmap));
	}, [roadmap]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("cat-career-coach-target", target);
	}, [target]);
	async function sendMessage(suggested) {
		const content = (suggested || draft).trim();
		if (!content || !resume || sending) return;
		const userMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content
		};
		const history = [...messages, userMessage];
		setMessages(history);
		setDraft("");
		setSending(true);
		try {
			const response = await fetch("/api/career-coach", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					resumeText: resume.text,
					targetRole: target,
					messages: history.slice(-10).map(({ role, content: text }) => ({
						role,
						content: text
					}))
				})
			});
			const result = await response.json();
			if (!response.ok || !result.reply) throw new Error(result.error || "AI coach unavailable");
			setMessages((current) => [...current, {
				id: crypto.randomUUID(),
				role: "assistant",
				content: result.reply
			}]);
			if (result.roadmap?.length) setRoadmap(result.roadmap);
			setCoachMode("ai");
		} catch {
			const roles = inferRolesLocally(resume.text);
			setMessages((current) => [...current, {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `我先用本地教练模式继续。你提到“${content.slice(0, 80)}”。为了判断这段经验能否迁移到 ${target || roles[0]}，请补充三个证据：你解决了谁的问题、你亲自做了什么、结果如何衡量？有了这些信息，我可以帮助你把经历改写成目标岗位能理解的案例。`
			}]);
			setRoadmap(buildLocalRoadmap(target || roles[0]));
			setCoachMode("local");
		} finally {
			setSending(false);
		}
	}
	function resetConversation() {
		const roles = inferRolesLocally(resume.text);
		setMessages([{
			id: crypto.randomUUID(),
			role: "assistant",
			content: `我们重新开始。简历显示你具备与 ${roles[0]} 相关的经验，但我不会仅凭职位名称替你决定方向。你现在最想保留的工作内容是什么，最想摆脱的又是什么？`
		}]);
		setRoadmap(buildLocalRoadmap(target));
		localStorage.removeItem("cat-career-coach-messages");
	}
	if (!resume) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content narrow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "page-heading",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "CAREER COACH"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "AI 职业教练" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "先导入简历，教练才会基于真实经历提问，而不是给出泛泛建议。" })
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel coach-empty",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 30 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "导入简历后开始对话" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我们会识别可迁移经验、探索转行方向，并生成可执行的学习路线。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary",
					onClick: onOpenProfile,
					children: "前往导入简历"
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content coach-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "CAREER COACH"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "职业方向对话" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "基于简历证据探索下一步，也可以讨论完全不同的职业方向。" })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `coach-mode ${coachMode === "ai" ? "ai" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), coachMode === "ai" ? "AI 深度教练" : "本地教练模式"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "coach-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel coach-chat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "coach-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: resume.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "对话保存在当前浏览器" })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: resetConversation,
							children: "重新开始"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "coach-messages",
						"aria-live": "polite",
						children: [
							messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `coach-message ${message.role}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message.role === "assistant" ? "教练" : "你" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message.content })]
							}, message.id)),
							sending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "coach-message assistant thinking",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "教练" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "正在梳理你的经历与目标…" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEnd })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "coach-prompts",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void sendMessage("我不喜欢现在的工作，想探索可以转去哪些领域。"),
								children: "我想转行"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void sendMessage("请挑战一下我当前的目标职位是否现实。"),
								children: "检验目标"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void sendMessage("请根据我的经历追问一个最关键的项目。"),
								children: "深挖项目"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "coach-composer",
						onSubmit: (event) => {
							event.preventDefault();
							sendMessage();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							"aria-label": "给职业教练发送消息",
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							placeholder: "例如：我做了 5 年运营，但想转到产品管理，我该从哪里开始？",
							rows: 3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !draft.trim() || sending,
							"aria-label": "发送",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 17 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "coach-privacy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 13 }), "对话保存在本机；启用 AI 教练时，简历文字与最近对话会发送到你配置的 OpenAI API。"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "panel roadmap-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "roadmap-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "目标学习路线" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "路线会随对话和目标更新" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["目标职位", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: target,
						onChange: (event) => setTarget(event.target.value),
						onBlur: (event) => setRoadmap(buildLocalRoadmap(event.target.value)),
						placeholder: "例如：Product Manager"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "roadmap-list",
						children: roadmap.map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "roadmap-index",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage.duration }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: stage.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: stage.outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: outcome }, outcome)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "实践项目" }), stage.project] })
						] })] }, `${stage.title}-${index}`))
					})
				]
			})]
		})]
	});
}
function MaterialsPanel({ jobs, onOpenProfile, onOpenQueue }) {
	const [resume] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return null;
		const saved = localStorage.getItem("cat-career-resume");
		if (!saved) return null;
		try {
			return JSON.parse(saved);
		} catch {
			localStorage.removeItem("cat-career-resume");
			return null;
		}
	});
	const queuedJobs = jobs.filter((job) => job.status === "已加入");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content narrow materials-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "APPLICATION ASSETS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "材料库" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "管理主简历，以及每个申请对应的定制简历、求职信和开放题草稿。" })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "materials-summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "主简历" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: resume ? "1" : "0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: resume ? "已导入" : "尚未导入" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "待定制职位" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: queuedJobs.length }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "来自申请队列" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "已完成材料" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "生成并审核后计数" })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel master-resume-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "material-card-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 22 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "material-card-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-kicker",
								children: "MASTER RESUME"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: resume?.name ?? "还没有主简历" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: resume ? `${(resume.size / 1024).toFixed(0)} KB · ${resume.text.length.toLocaleString()} 个字符 · 导入于 ${new Date(resume.importedAt).toLocaleDateString("zh-CN")}` : "先在求职画像中导入简历，系统才能进行匹配和生成定制版本。" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-action",
						onClick: onOpenProfile,
						children: [resume ? "更换或重新分析" : "前往导入", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel tailored-materials",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "职位定制材料" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "加入申请队列的职位会出现在这里；未生成的内容不会冒充成已完成。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenQueue,
						children: "查看申请队列"
					})]
				}), queuedJobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "materials-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "还没有待定制职位" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "先从今日雷达选择合适职位并加入申请队列。" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary",
							onClick: onOpenQueue,
							children: "前往申请队列"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "material-list",
					children: queuedJobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "material-job",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "company-logo",
								style: { background: job.color },
								children: job.initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "material-job-copy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: job.role }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										job.company,
										" · 匹配度 ",
										job.score,
										"%"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "定制简历 · 求职信 · 开放题草稿" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-state",
								children: "待生成"
							})
						]
					}, job.id))
				})]
			})
		]
	});
}
function SourcesPanel({ onRefresh, onLinkedInChange, onLinkedInImport }) {
	const [sourceEnabled, setSourceEnabled] = (0, import_react.useState)({
		Greenhouse: true,
		Lever: true,
		Ashby: true,
		LinkedIn: false
	});
	const [linkedIn, setLinkedIn] = (0, import_react.useState)(defaultLinkedIn);
	const [showLinkedIn, setShowLinkedIn] = (0, import_react.useState)(false);
	const [sourceNotice, setSourceNotice] = (0, import_react.useState)("");
	const [linkedInImport, setLinkedInImport] = (0, import_react.useState)({
		company: "",
		role: "",
		location: "",
		url: "",
		description: ""
	});
	(0, import_react.useEffect)(() => {
		const savedSources = localStorage.getItem("cat-career-sources");
		const savedLinkedIn = localStorage.getItem("cat-career-linkedin");
		const savedProfile = localStorage.getItem("cat-career-profile");
		if (savedSources) try {
			setSourceEnabled((current) => ({
				...current,
				...JSON.parse(savedSources)
			}));
		} catch {
			localStorage.removeItem("cat-career-sources");
		}
		if (savedLinkedIn) try {
			const parsed = {
				...defaultLinkedIn,
				...JSON.parse(savedLinkedIn)
			};
			setLinkedIn(parsed);
			setShowLinkedIn(parsed.enabled);
			onLinkedInChange(parsed);
		} catch {
			localStorage.removeItem("cat-career-linkedin");
		}
		else if (savedProfile) try {
			const profile = JSON.parse(savedProfile);
			setLinkedIn((current) => ({
				...current,
				keywords: profile.roleKeywords,
				location: profile.location
			}));
		} catch {}
	}, []);
	function toggleSource(name, enabled) {
		const updated = {
			...sourceEnabled,
			[name]: enabled
		};
		setSourceEnabled(updated);
		localStorage.setItem("cat-career-sources", JSON.stringify(updated));
		if (name === "LinkedIn") {
			const config = {
				...linkedIn,
				enabled
			};
			setLinkedIn(config);
			setShowLinkedIn(enabled);
			localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
			onLinkedInChange(config);
		} else window.setTimeout(onRefresh, 0);
	}
	function saveLinkedIn() {
		if (!linkedIn.keywords.trim() || !linkedIn.location.trim()) {
			setSourceNotice("请先填写职位关键词和地点");
			return false;
		}
		const config = {
			...linkedIn,
			enabled: true
		};
		const sources = {
			...sourceEnabled,
			LinkedIn: true
		};
		setLinkedIn(config);
		setSourceEnabled(sources);
		onLinkedInChange(config);
		localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
		localStorage.setItem("cat-career-sources", JSON.stringify(sources));
		setSourceNotice("LinkedIn 搜索已保存并显示在 Dashboard");
		window.setTimeout(() => setSourceNotice(""), 2500);
		return true;
	}
	function toggleExperience(value) {
		setLinkedIn((current) => ({
			...current,
			experience: current.experience.includes(value) ? current.experience.filter((item) => item !== value) : [...current.experience, value]
		}));
	}
	function importJob() {
		if (!linkedInImport.company.trim() || !linkedInImport.role.trim() || !linkedInImport.location.trim() || !linkedInImport.description.trim()) {
			setSourceNotice("导入评分需要公司、职位、地点和完整职位描述");
			return;
		}
		try {
			const url = new URL(linkedInImport.url);
			if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) throw new Error("not LinkedIn");
		} catch {
			setSourceNotice("请输入有效的 LinkedIn 职位链接");
			return;
		}
		onLinkedInImport(linkedInImport);
		setLinkedInImport({
			company: "",
			role: "",
			location: "",
			url: "",
			description: ""
		});
	}
	const sources = [
		{
			name: "Greenhouse",
			detail: "4 个公司职位板 · 自动实时刷新"
		},
		{
			name: "Lever",
			detail: "1 个公司职位板 · 自动实时刷新"
		},
		{
			name: "Ashby",
			detail: "1 个公司职位板 · 自动实时刷新"
		},
		{
			name: "LinkedIn",
			detail: linkedIn.enabled ? "搜索入口已显示在 Dashboard" : "配置后显示在 Dashboard"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content narrow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "JOB SOURCES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "职位来源" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "公开职位板会在 Dashboard 自动刷新；LinkedIn 会生成并保存搜索链接，由你在已登录的浏览器中查看。" })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel source-list",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-header",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "已配置来源" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "公开职位板扫描时会自动去重；LinkedIn 不会被后台抓取。" })] })
				}), sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `source-row ${source.name === "LinkedIn" && showLinkedIn ? "selected" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `source-symbol ${source.name === "LinkedIn" ? "linkedin" : ""}`,
							children: source.name === "LinkedIn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "linkedin-glyph",
								children: "in"
							}) : source.name[0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: source.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: source.detail })] }),
						source.name === "LinkedIn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "source-config",
							onClick: () => setShowLinkedIn((current) => !current),
							children: showLinkedIn ? "收起" : "配置"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "switch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: Boolean(sourceEnabled[source.name]),
								onChange: (event) => toggleSource(source.name, event.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
						})
					]
				}, source.name))]
			}),
			showLinkedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel linkedin-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "linkedin-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "linkedin-glyph large",
								children: "in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "LinkedIn Dashboard 搜索" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "设置搜索条件并保存后，Dashboard 会持续显示这个 LinkedIn 搜索入口。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `session-badge ${linkedIn.enabled ? "verified" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), linkedIn.enabled ? "已加入 Dashboard" : "待配置"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-steps",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "done",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "设置搜索条件" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: linkedIn.enabled ? "done" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "保存到 Dashboard" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["职位关键词", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: linkedIn.keywords,
								onChange: (event) => setLinkedIn({
									...linkedIn,
									keywords: event.target.value
								}),
								placeholder: "例如：Senior Product Owner, Product Manager"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["地点", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: linkedIn.location,
								onChange: (event) => setLinkedIn({
									...linkedIn,
									location: event.target.value
								}),
								placeholder: "例如：Toronto, Canada"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "linkedin-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["工作地点", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: linkedIn.workplace,
										onChange: (event) => setLinkedIn({
											...linkedIn,
											workplace: event.target.value
										}),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hybrid-remote",
												children: "远程或混合"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "remote",
												children: "仅远程"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hybrid",
												children: "仅混合"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "onsite",
												children: "仅现场"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "不限"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["发布时间", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: linkedIn.datePosted,
										onChange: (event) => setLinkedIn({
											...linkedIn,
											datePosted: event.target.value
										}),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "day",
												children: "过去 24 小时"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "week",
												children: "过去一周"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "month",
												children: "过去一个月"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "any",
												children: "不限"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["雇佣类型", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: linkedIn.employment,
										onChange: (event) => setLinkedIn({
											...linkedIn,
											employment: event.target.value
										}),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "F",
												children: "全职"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "C",
												children: "合同"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "P",
												children: "兼职"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "不限"
											})
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "经验级别" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "chip-options",
								children: [
									["2", "初级"],
									["3", "助理"],
									["4", "中高级"],
									["5", "总监"],
									["6", "高管"]
								].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: linkedIn.experience.includes(value) ? "active" : "",
									onClick: () => toggleExperience(value),
									children: [linkedIn.experience.includes(value) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }), label]
								}, value))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "linkedin-checks",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: linkedIn.easyApply,
									onChange: (event) => setLinkedIn({
										...linkedIn,
										easyApply: event.target.checked
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "仅 Easy Apply" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "只显示可在 LinkedIn 内申请的职位" })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: linkedIn.mostRecent,
									onChange: (event) => setLinkedIn({
										...linkedIn,
										mostRecent: event.target.checked
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "最新发布优先" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "优先发现刚发布的机会" })] })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary",
								onClick: saveLinkedIn,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), "保存到 Dashboard"]
							}),
							linkedIn.keywords.trim() && linkedIn.location.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "secondary-action",
								href: linkedInSearchUrl(linkedIn),
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 15 }), "预览 LinkedIn 搜索"]
							}),
							sourceNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "source-saved",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), sourceNotice]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dashboard 会显示搜索入口和筛选条件。" }), "职位结果仍由 LinkedIn 提供；当前应用不抓取已登录页面、不截取搜索结果，也不保存密码或 Cookie。获得 LinkedIn 授权职位读取 API 后，可再升级为职位列表同步。"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "linkedin-import",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "linkedin-glyph large",
								children: "in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "导入 LinkedIn 职位并评分" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "从职位页复制完整描述；系统会按当前求职画像评分，并把结果加入 Dashboard。" })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "linkedin-import-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["公司", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: linkedInImport.company,
										onChange: (event) => setLinkedInImport({
											...linkedInImport,
											company: event.target.value
										}),
										placeholder: "例如：Acme"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["职位名称", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: linkedInImport.role,
										onChange: (event) => setLinkedInImport({
											...linkedInImport,
											role: event.target.value
										}),
										placeholder: "例如：Senior Product Designer"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["地点", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: linkedInImport.location,
										onChange: (event) => setLinkedInImport({
											...linkedInImport,
											location: event.target.value
										}),
										placeholder: "例如：Toronto, Canada"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["LinkedIn 职位链接", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: linkedInImport.url,
										onChange: (event) => setLinkedInImport({
											...linkedInImport,
											url: event.target.value
										}),
										placeholder: "https://www.linkedin.com/jobs/view/…"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["完整职位描述", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: linkedInImport.description,
								onChange: (event) => setLinkedInImport({
									...linkedInImport,
									description: event.target.value
								}),
								rows: 7,
								placeholder: "粘贴 Responsibilities、Qualifications 等完整职位文字，描述越完整，评分越可靠。"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "linkedin-import-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary",
									onClick: importJob,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), "导入、评分并显示在 Dashboard"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "评分只基于你提供的文字和当前画像；不会访问 LinkedIn 会话。" })]
							})
						]
					})
				]
			})
		]
	});
}
function AutomationPanel({ identity, onIdentityChange }) {
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [model, setModel] = (0, import_react.useState)("gpt-5.6-sol");
	const [hasKey, setHasKey] = (0, import_react.useState)(false);
	const [keyStatus, setKeyStatus] = (0, import_react.useState)("idle");
	const [keyMessage, setKeyMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		localStorage.removeItem("cat-career-openai-key");
		localStorage.removeItem("cat-career-openai-model");
		fetch("/api/openai-key").then((response) => response.json()).then((result) => {
			setHasKey(Boolean(result.configured));
			if (result.model) setModel(String(result.model));
		}).catch(() => setHasKey(false));
	}, []);
	async function validateAndSaveKey() {
		if (!apiKey.trim()) {
			setKeyStatus("error");
			setKeyMessage("请输入 API Key。");
			return;
		}
		setKeyStatus("checking");
		setKeyMessage("正在验证 Key 和模型权限…");
		try {
			const response = await fetch("/api/openai-key", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					apiKey: apiKey.trim(),
					model: model.trim()
				})
			});
			const result = await response.json();
			if (!response.ok || !result.valid) throw new Error(result.error || "验证失败。");
			setHasKey(true);
			setApiKey("");
			setKeyStatus("saved");
			setKeyMessage("API Key 已验证，并保存在本地服务的当前运行会话。");
		} catch (error) {
			setKeyStatus("error");
			setKeyMessage(error instanceof Error ? error.message : "无法验证 API Key。");
		}
	}
	async function removeKey() {
		await fetch("/api/openai-key", { method: "DELETE" }).catch(() => null);
		setApiKey("");
		setHasKey(false);
		setKeyStatus("idle");
		setKeyMessage("会话 Key 已从本地服务移除。");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "content narrow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "SETTINGS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "个人与自动化设置" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "个人信息会即时同步到侧栏；API Key 只保存在当前浏览器。" })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "settings-sections",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel settings-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "settings-card-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "settings-card-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "个人显示信息" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "修改后立即更新侧栏和欢迎语。" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "identity-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["姓名", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: identity.name,
										onChange: (event) => onIdentityChange({
											...identity,
											name: event.target.value
										}),
										placeholder: "例如：Jack Zhang"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["城市", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: identity.location,
										onChange: (event) => onIdentityChange({
											...identity,
											location: event.target.value
										}),
										placeholder: "例如：Toronto"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["职业方向", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: identity.focus,
										onChange: (event) => onIdentityChange({
											...identity,
											focus: event.target.value
										}),
										placeholder: "例如：Product Operations"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "live-preview",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "avatar",
										children: identity.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: identity.name || "未设置姓名" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [identity.location, identity.focus].filter(Boolean).join(" · ") || "完善个人信息" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "实时预览" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel settings-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "settings-card-heading",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "settings-card-icon ai",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "OpenAI API" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "用于简历画像分析；没有 Key 时自动使用本地规则。" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `api-status ${hasKey ? "ready" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), hasKey ? "本地服务已配置" : "未配置"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "api-key-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["API Key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									autoComplete: "off",
									value: apiKey,
									onChange: (event) => {
										setApiKey(event.target.value);
										setKeyStatus("idle");
									},
									placeholder: hasKey ? "输入新 Key 可替换当前会话 Key" : "sk-…"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["模型 ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: model,
									onChange: (event) => setModel(event.target.value),
									placeholder: "gpt-5.6-sol"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "api-key-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "primary",
										disabled: keyStatus === "checking",
										onClick: () => void validateAndSaveKey(),
										children: keyStatus === "checking" ? "验证中…" : "验证并使用"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "secondary-action danger",
										disabled: !hasKey,
										onClick: () => void removeKey(),
										children: "移除会话 Key"
									}),
									keyMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: keyStatus === "error" ? "error" : "",
										children: [keyStatus === "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), keyMessage]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "local-key-note",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Key 不会进入浏览器存储、项目文件或 Git；页面刷新后仍可使用，但本地服务重启后会清除。需要持久化时请使用被 Git 忽略的 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ".env.local" }),
									"。"
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel automation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "automation-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "每日自动扫描" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "工作日 08:30 · America/Toronto" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "switch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "automation-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "自动生成定制材料" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "只对 80 分以上且通过硬条件的职位执行" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "switch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										defaultChecked: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "automation-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "自动填充申请表" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "实验性功能；遇到开放题、验证码或异常时暂停" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "switch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "automation-row locked",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "自动点击最终提交" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "默认关闭。建议保留人工确认，防止错投或错误声明。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "guardrail",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "你的确认是最后一道门" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "系统可以筛选、改写和填表，但任何对外提交都会在申请队列中等待你确认。" })] })]
			})
		]
	});
}
function JobDrawer({ job, onClose, onStatus, onRemoveImported }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "drawer-layer",
		onMouseDown: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "drawer",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-close",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-company",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "company-logo big",
						style: { background: job.color },
						children: job.initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: job.company }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: job.role }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }),
							job.location,
							" · ",
							job.mode
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "drawer-job-link",
							href: job.url,
							target: "_blank",
							rel: "noreferrer",
							children: ["查看原岗位 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-score",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "综合匹配" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [job.score, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "/100" })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "score-bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${job.score}%` } })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: job.reason })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "为什么值得申请" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "核心技能覆盖度高，简历中有直接证据" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "薪资和地点均满足你的硬性条件" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "职级与最近两段经历的职责范围一致" })
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "定制材料计划" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "material",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 18 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "一页式定制简历" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"突出 ",
								job.tags.slice(0, 2).join("、"),
								" 相关经历"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "待生成" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "material",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "开放题答案草稿" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "仅使用画像中可验证的事实" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "待生成" })
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-footer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "source-job-button",
							href: job.url,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 }), "打开原岗位"]
						}),
						job.source === "LinkedIn · 用户导入" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onRemoveImported(job.id),
							children: "移除导入"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onStatus(job.id, "已跳过"),
							children: "跳过"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary",
							onClick: () => onStatus(job.id, "已加入"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 17 }), "加入申请队列"]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { CareerDashboard };
