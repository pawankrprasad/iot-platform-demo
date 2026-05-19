import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMantineTheme } from '@mantine/core';
import { SectionCard } from '@components';

export function TelemetryGraph({ data, title }) {
    const theme = useMantineTheme();
    return (
        <SectionCard title={title}>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.other.colors.blue} stopOpacity={0.3} /><stop offset="95%" stopColor={theme.other.colors.blue} stopOpacity={0} /></linearGradient>
                        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.other.colors.emerald} stopOpacity={0.3} /><stop offset="95%" stopColor={theme.other.colors.emerald} stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.dark[5]} />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: theme.colors.dark[2] }} /><YAxis tick={{ fontSize: 10, fill: theme.colors.dark[2] }} />
                    <Tooltip contentStyle={{ background: theme.colors.dark[7], border: 'none', borderRadius: 8, fontSize: 11 }} />
                    <Area type="monotone" dataKey="cpu" stroke={theme.other.colors.blue} fill="url(#g1)" name="CPU %" />
                    <Area type="monotone" dataKey="memory" stroke={theme.other.colors.emerald} fill="url(#g2)" name="Memory %" />
                </AreaChart>
            </ResponsiveContainer>
        </SectionCard>
    );
}
