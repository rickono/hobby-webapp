export function LaListeBadge(laListe: number): React.ReactNode {
    if (!laListe) {
        return ''
    } else if (laListe === 1) {
        return <div className="text-gray-50 bg-rose-500 font-bold py-0.25 px-2 text-xs w-fit rounded-md">
            Food gem
        </div>
    } else if (laListe === 2) {
        return <div className="text-gray-50 bg-slate-400 font-bold py-0.25 px-2 text-xs w-fit rounded-md">
            Outstanding
        </div>
    } else {
        return <div className="text-white bg-amber-300 font-bold py-0.25 px-2 text-xs w-fit rounded-md">
            {laListe}
        </div>
    }
}

export type LaListeAward = {
    year: number
    distinction: 'food_gem' | 'outstanding' | number
}

export function displayLaListeAward(award: LaListeAward) {
    if (award.distinction === 'food_gem') {
        return 'Food Gem'
    } else if (award.distinction === 'outstanding') {
        return 'Outstanding'
    } else {
        return `Top 1000: ${award.distinction}`
    }
}
