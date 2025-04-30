async function getResponse(url : string) {
	try {
		const response = await fetch(url + '/');
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error( error )
	}
}

export default getResponse;