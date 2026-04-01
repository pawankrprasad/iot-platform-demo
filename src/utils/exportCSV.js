/**
 * Exports the given rows/cols as a CSV file download.
 * @param {Array<{key: string, label: string}>} cols  - Table column definitions
 * @param {Array<object>} rows                         - Table row data
 * @param {string} filename                            - Downloaded file name (without extension)
 */
export function exportCSV(cols, rows, filename = 'export') {
    // Use only columns that have a plain key (skip action/render-only cols with no real data)
    const dataCols = cols.filter((c) => c.key);

    const header = dataCols.map((c) => `"${c.label}"`).join(',');

    const body = rows.map((row) =>
        dataCols
            .map((c) => {
                const val = row[c.key] ?? '';
                // Escape double-quotes inside values
                return `"${String(val).replace(/"/g, '""')}"`;
            })
            .join(',')
    );

    const csv = [header, ...body].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
