import { Database } from "@/types/supabase"

export function agitationTypeString(
    agitationType: Database['public']['Enums']['coffee_agitation_type'] | null,
): string {
    switch (agitationType) {
        case 'stir':
            return 'Stir'
        case 'swirl':
            return 'Swirl'
        case 'wet_wdt':
            return 'Wet WDT'
        case null:
            return 'Agitate'
    }
}

export function durationString(seconds: number): string {
    return new Date(1000 * seconds).toISOString().substr(14, 5)
}
