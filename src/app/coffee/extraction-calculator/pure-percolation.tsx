'use client'

import Input from '@/components/Input'
import DataDisplay from '@/components/DataDisplay'
import { useState } from 'react'
import RadioCards from '@/components/RadioCards'

function coffeeZone(tds: number, ey: number): string {
    let strength = ''
    if (tds > 1.5) {
        strength = 'strong'
    } else if (tds < 1.25) {
        strength = 'weak'
    }

    let extraction = ''
    if (ey > 24) {
        extraction = 'harsh'
    } else if (ey < 19) {
        extraction = 'under-extracted'
    }

    if (extraction === strength) {
        return 'ideal'
    }
    return `${strength} and ${extraction}`.trim()
}

export default function PurePercolation() {
    const [c, setC] = useState('')
    const [b, setB] = useState('')
    const [d, setD] = useState('')
    const [w, setW] = useState('')
    const [cSlurry, setCSlurry] = useState('')
    const [method, setMethod] = useState('percolation')

    const C = parseFloat(c) / 100
    const B = parseFloat(b)
    const D = parseFloat(d)
    const W = parseFloat(w)
    const C_S = parseFloat(cSlurry) / 100

    const purePercolation = C * B / D * 100
    const pureImmersion = C * W / D * 100
    const fAbs = (W - B) / D
    const immersion = C / (1 - C) * (W / D - fAbs) * 100
    const percolation = ((C - C_S) / (1 - C_S)) * (B / D) + (C_S / (1 - C_S)) * ((W / D) - fAbs) * 100
    const accurateExtraction = method === 'percolation' ? percolation : immersion
    const shareableExtraction = method === 'percolation' ? purePercolation : pureImmersion
    const accurateValid = !isNaN(accurateExtraction) && isFinite(accurateExtraction)
    const extraction = accurateValid ? accurateExtraction : shareableExtraction
    const extractionValid = !isNaN(extraction) && isFinite(extraction)

    return (
        <>
            <RadioCards
                name="brew-method"
                title="Brew method"
                options={[
                    { id: 'percolation', title: "Percolation", description: "V60, Stagg [X], Chemex, etc." },
                    { id: 'immersion', title: 'Immersion', description: "French press, cupping" }]}
                checked={method}
                setChecked={setMethod}
            />
            <div className="flex gap-4 items-end">
                <Input
                    type="number"
                    label="Concentration (TDS %)"
                    id="c"
                    name="c"
                    value={c}
                    onChange={e => setC(e.target.value)}
                />
                <Input
                    type="number"
                    label="Beverage weight"
                    id="b"
                    name="b"
                    value={b}
                    onChange={e => setB(e.target.value)}
                />
                <Input
                    type="number"
                    label="Dry coffee dose"
                    id="d"
                    name="d"
                    value={d}
                    onChange={e => setD(e.target.value)}
                />
                <Input
                    type="number"
                    label="Brew water weight"
                    id="w"
                    name="w"
                    value={w}
                    onChange={e => setW(e.target.value)}
                />
                {method === 'percolation' && <Input
                    type="number"
                    label="Slurry concentration"
                    id="c_s"
                    name="c_s"
                    value={cSlurry}
                    onChange={e => setCSlurry(e.target.value)}
                />}
            </div>
            <DataDisplay title="Results" stats={[
                { name: 'Shareable Extraction', stat: `${extractionValid ? shareableExtraction.toFixed(1).toString() : '--'}%` },
                { name: 'Accurate Extraction', stat: `${accurateValid ? accurateExtraction.toFixed(1).toString() : '--'}%` },
            ]} />
            <p>Your coffee is <span className='font-bold'>{coffeeZone(C * 100, extraction)}</span>.</p>
        </>
    )
}
