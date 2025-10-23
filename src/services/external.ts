import type { ipLookupResponse } from "$types";
import { IP_LOOKUP } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

export async function fetchSessionInformation({
	fetch
}: RequestEvent): Promise<ipLookupResponse | null> {
	try {
		const response = await fetch(IP_LOOKUP);
		const { city, country, ip, region }: ipLookupResponse = await response.json();
		return { city, country, ip, region };
	} catch (error) {
		return null;
	}
}
