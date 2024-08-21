import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Step 1: ดึงรายการเหรียญทั้งหมด
        const listingsResponse = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_KEY,
            },
        });

        if (!listingsResponse.ok) {
            throw new Error(`Error fetching listings: ${listingsResponse.status}`);
        }

        const listingsData = await listingsResponse.json();
        const ids = listingsData.data.map(coin => coin.id).join(',');

        // Step 2: ดึงข้อมูลรายละเอียดของเหรียญทั้งหมด
        const infoResponse = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`, {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_KEY,
            },
        });

        if (!infoResponse.ok) {
            throw new Error(`Error fetching info: ${infoResponse.status}`);
        }

        const infoData = await infoResponse.json();
        return NextResponse.json(infoData);

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

