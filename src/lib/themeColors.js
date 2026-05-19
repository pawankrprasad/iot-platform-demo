export const customColors = {
    magenta: '#e917bb',
    blue:    '#3b82f6',
    lime:    '#C6CC14',
    purple:  '#7C14CC',
    emerald: '#10b981',
    slate:   '#afafae',
    red:     '#ef4444',
    amber:   '#dfa269',
    orange:  '#f97316',
    yellow:  '#eab308',
    green:   '#2bdd66',
    indigo:  '#6366f1',
    violet:  '#8b5cf6',
    cyan:    '#06b6d4',
};

export const statusColors = {
    // Device / connectivity
    online: customColors.green,
    offline: customColors.slate,
    // Alert severity
    critical: customColors.red,
    high: customColors.orange,
    medium: customColors.yellow,
    low: customColors.blue,
    // Generic
    active: customColors.green,
    inactive: customColors.slate,
    resolved: customColors.lime,
    acknowledged: customColors.orange,
};

export const defaultColor = [
    "#dce1eb",
    "#cbedff",
    "#9ad7ff",
    "#64c1ff",
    "#3aaefe",
    "#20a2fe",
    "#099cff",
    "#0088e4",
    "#0079cd",
    "#0068b6"
];

export const defaultDark = [
    '#C1C2C5', // 0: Text
    '#A6A7AB',
    '#909296',
    '#5C5F66',
    '#373A40',
    '#2C2E33',
    '#25262B',
    '#1e2535', // 7: Body Background — controls --mantine-color-body in dark mode
    '#171c28',
    '#10141c',
];