function fakeAPICall(id, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof id === 'number') {
                resolve(`Response from API call ${id}`);
            } else {
                reject(`Provide id number in API call}`);
            }
        }, delay);
    });
}


async function serialExecution() {
    console.time('serialExecution')
    try {
        const response1 = await fakeAPICall(1, 1000);
        console.log(response1);

        const response2 = await fakeAPICall(2, 1500);
        console.log(response2);

        const response3 = await fakeAPICall(3, 1200);
        console.log(response3);
    } catch (error) {
        console.error(error);
    }
    console.timeEnd('serialExecution')
}

async function parallelExecution() {
    console.time('parallelExecution')

    try {
        const promises = [
            fakeAPICall(1, 1000),
            fakeAPICall(2, 1500),
            fakeAPICall(3, 1200)
        ];

        const responses = await Promise.all(promises);
        // const responses = await Promise.allSettled(promises);
        console.log(responses);
    } catch (error) {
        console.error(error);
    }
    console.timeEnd('parallelExecution')
}

serialExecution();
parallelExecution();
