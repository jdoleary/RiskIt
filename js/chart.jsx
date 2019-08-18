import React from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid } from 'recharts';
const data = [
    { date: 1, price: 105.35 },
    { date: 1, price: 102.71 },
    { date: 1, price: 100.7 },
    { date: 1, price: 96.45 },
    { date: 1, price: 96.96 },
    { date: 1, price: 98.53 },
    { date: 1, price: 99.96 },
    { date: 1, price: 97.39 },
    { date: 1, price: 99.52 },
    { date: 1, price: 97.13 },
    { date: 1, price: 96.66 },
    { date: 1, price: 96.79 },
    { date: 1, price: 96.3 },
    { date: 1, price: 101.42 },
    { date: 1, price: 99.44 },
    { date: 1, price: 99.99 },
    { date: 1, price: 93.42 },
    { date: 1, price: 94.09 },
    { date: 1, price: 97.34 },
    { date: 1, price: 96.43 },
    { date: 1, price: 94.48 },
    { date: 1, price: 96.35 },
    { date: 1, price: 96.6 },
    { date: 1, price: 94.02 },
    { date: 1, price: 95.01 },
    { date: 1, price: 94.99 },
    { date: 1, price: 94.27 },
    { date: 1, price: 93.7 },
    { date: 1, price: 93.99 },
    { date: 1, price: 96.64 },
    { date: 1, price: 98.12 },
    { date: 1, price: 96.26 },
    { date: 1, price: 96.04 },
    { date: 1, price: 96.88 },
    { date: 1, price: 94.69 },
    { date: 1, price: 96.1 },
    { date: 1, price: 96.76 },
    { date: 1, price: 96.91 },
    { date: 1, price: 96.69 },
    { date: 1, price: 100.53 },
    { date: 1, price: 100.75 },
    { date: 1, price: 101.5 },
    { date: 1, price: 103.01 },
    { date: 1, price: 101.87 },
    { date: 1, price: 101.03 },
    { date: 1, price: 101.12 },
    { date: 1, price: 101.17 },
    { date: 1, price: 102.26 },
    { date: 1, price: 102.52 },
    { date: 1, price: 104.58 },
    { date: 1, price: 105.97 },
    { date: 1, price: 105.8 },
    { date: 1, price: 105.92 },
    { date: 1, price: 105.91 },
    { date: 1, price: 106.72 },
    { date: 1, price: 106.13 },
    { date: 1, price: 105.67 },
    { date: 1, price: 105.19 },
    { date: 1, price: 107.68 },
    { date: 1, price: 109.56 },
    { date: 1, price: 108.99 },
    { date: 1, price: 109.99 },
    { date: 1, price: 111.12 },
    { date: 1, price: 109.81 },
    { date: 1, price: 110.96 },
    { date: 1, price: 108.54 },
    { date: 1, price: 108.66 },
    { date: 1, price: 109.02 },
    { date: 1, price: 110.44 },
    { date: 1, price: 112.04 },
    { date: 1, price: 112.1 },
    { date: 1, price: 109.85 },
    { date: 1, price: 107.48 },
    { date: 1, price: 106.91 },
    { date: 1, price: 107.13 },
    { date: 1, price: 105.97 },
    { date: 1, price: 105.68 },
    { date: 1, price: 105.08 },
    { date: 1, price: 104.35 },
    { date: 1, price: 97.82 },
    { date: 1, price: 94.83 },
    { date: 1, price: 93.74 },
    { date: 1, price: 93.64 },
    { date: 1, price: 95.18 },
    { date: 1, price: 94.19 },
    { date: 1, price: 93.24 },
    { date: 1, price: 92.72 },
    { date: 1, price: 92.79 },
    { date: 1, price: 93.42 },
    { date: 1, price: 92.51 },
    { date: 1, price: 90.34 },
    { date: 1, price: 90.52 },
    { date: 1, price: 93.88 },
    { date: 1, price: 93.49 },
    { date: 1, price: 94.56 },
    { date: 1, price: 94.2 },
    { date: 1, price: 95.22 },
    { date: 1, price: 96.43 },
    { date: 1, price: 97.9 },
    { date: 1, price: 99.62 },
    { date: 1, price: 100.41 },
    { date: 1, price: 100.35 },
    { date: 1, price: 99.86 },
    { date: 1, price: 98.46 },
    { date: 1, price: 97.72 },
    { date: 1, price: 97.92 },
    { date: 1, price: 98.63 },
    { date: 1, price: 99.03 },
    { date: 1, price: 98.94 },
    { date: 1, price: 99.65 },
    { date: 1, price: 98.83 },
    { date: 1, price: 97.34 },
    { date: 1, price: 97.46 },
    { date: 1, price: 97.14 },
    { date: 1, price: 97.55 },
    { date: 1, price: 95.33 },
    { date: 1, price: 95.1 },
    { date: 1, price: 95.91 },
    { date: 1, price: 95.55 },
    { date: 1, price: 96.1 },
    { date: 1, price: 93.4 },
    { date: 1, price: 92.04 },
    { date: 1, price: 93.59 },
    { date: 1, price: 94.4 },
    { date: 1, price: 95.6 },
    { date: 1, price: 95.89 },
    { date: 1, price: 94.99 },
    { date: 1, price: 95.53 },
    { date: 1, price: 95.94 },
    { date: 1, price: 96.68 },
    { date: 1, price: 96.98 },
    { date: 1, price: 97.42 },
    { date: 1, price: 96.87 },
    { date: 1, price: 98.79 },
    { date: 1, price: 98.78 },
    { date: 1, price: 99.83 },
    { date: 1, price: 99.87 },
    { date: 1, price: 99.96 },
    { date: 1, price: 99.43 },
    { date: 1, price: 98.66 },
    { date: 1, price: 97.34 },
    { date: 1, price: 96.67 },
    { date: 1, price: 102.95 },
    { date: 1, price: 104.34 },
    { date: 1, price: 104.21 },
    { date: 1, price: 106.05 },
    { date: 1, price: 104.48 },
    { date: 1, price: 105.79 },
    { date: 1, price: 105.87 },
    { date: 1, price: 107.48 },
    { date: 1, price: 108.37 },
    { date: 1, price: 108.81 },
    { date: 1, price: 108 },
    { date: 1, price: 107.93 },
    { date: 1, price: 108.18 },
    { date: 1, price: 109.48 },
    { date: 1, price: 109.38 },
    { date: 1, price: 109.22 },
    { date: 1, price: 109.08 },
    { date: 1, price: 109.36 },
    { date: 1, price: 108.51 },
    { date: 1, price: 108.85 },
    { date: 1, price: 108.03 },
    { date: 1, price: 107.57 },
    { date: 1, price: 106.94 },
    { date: 1, price: 106.82 },
    { date: 1, price: 106 },
    { date: 1, price: 106.1 },
    { date: 1, price: 106.73 },
    { date: 1, price: 107.73 },
    { date: 1, price: 107.7 },
    { date: 1, price: 108.36 },
    { date: 1, price: 105.52 },
    { date: 1, price: 103.13 },
    { date: 1, price: 105.44 },
    { date: 1, price: 107.95 },
    { date: 1, price: 111.77 },
    { date: 1, price: 115.57 },
    { date: 1, price: 114.92 },
    { date: 1, price: 113.58 },
    { date: 1, price: 113.57 },
    { date: 1, price: 113.55 },
    { date: 1, price: 114.62 },
    { date: 1, price: 112.71 },
    { date: 1, price: 112.88 },
    { date: 1, price: 113.09 },
    { date: 1, price: 113.95 },
    { date: 1, price: 112.18 },
    { date: 1, price: 113.05 },
    { date: 1, price: 112.52 },
    { date: 1, price: 113 },
    { date: 1, price: 113.05 },
    { date: 1, price: 113.89 },
    { date: 1, price: 114.06 },
    { date: 1, price: 116.05 },
    { date: 1, price: 116.3 },
    { date: 1, price: 117.34 },
    { date: 1, price: 116.98 },
    { date: 1, price: 117.63 },
    { date: 1, price: 117.55 },
    { date: 1, price: 117.47 },
    { date: 1, price: 117.12 },
    { date: 1, price: 117.06 },
    { date: 1, price: 116.6 },
    { date: 1, price: 117.65 },
    { date: 1, price: 118.25 },
    { date: 1, price: 115.59 },
    { date: 1, price: 114.48 },
    { date: 1, price: 113.72 },
    { date: 1, price: 113.54 },
    { date: 1, price: 111.49 },
    { date: 1, price: 111.59 },
    { date: 1, price: 109.83 },
    { date: 1, price: 108.84 },
    { date: 1, price: 110.41 },
    { date: 1, price: 111.06 },
    { date: 1, price: 110.88 },
    { date: 1, price: 107.79 },
    { date: 1, price: 108.43 },
    { date: 1, price: 105.71 },
    { date: 1, price: 107.11 },
    { date: 1, price: 109.99 },
    { date: 1, price: 109.95 },
    { date: 1, price: 110.06 },
    { date: 1, price: 111.73 },
    { date: 1, price: 111.8 },
    { date: 1, price: 111.23 },
    { date: 1, price: 111.79 },
    { date: 1, price: 111.57 },
    { date: 1, price: 111.46 },
    { date: 1, price: 110.52 },
    { date: 1, price: 109.49 },
    { date: 1, price: 109.9 },
    { date: 1, price: 109.11 },
    { date: 1, price: 109.95 },
    { date: 1, price: 111.03 },
    { date: 1, price: 112.12 },
    { date: 1, price: 113.95 },
    { date: 1, price: 113.3 },
    { date: 1, price: 115.19 },
    { date: 1, price: 115.19 },
    { date: 1, price: 115.82 },
    { date: 1, price: 115.97 },
    { date: 1, price: 116.64 },
    { date: 1, price: 116.95 },
    { date: 1, price: 117.06 },
    { date: 1, price: 116.29 },
    { date: 1, price: 116.52 },
    { date: 1, price: 117.26 },
    { date: 1, price: 116.76 },
    { date: 1, price: 116.73 },
    { date: 1, price: 115.82 },








];
export default function () {
    return <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid stroke="#f5f5f5" />

        <Line dataKey="price" stroke="#ff7300" dot={false} isAnimationActive={false}

        />
    </LineChart>
}