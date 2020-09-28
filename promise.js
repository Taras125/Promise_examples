//==========Promise============//
console.log('Request data...');
const promis = new Promise((res, rej) => {
    setTimeout(() => {
        console.log('Start procesing...');
        const obj = {
            server: 'aws',
            port: 80,
            status: 'Working',
        }
        res(obj)
    }, 2000)

})
promis.then(data => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            data.modifine = true
            res(data)
        }, 3000)
    })
})
    .then(clientData => {
        console.log('Project working...', clientData);
        clientData.fromPromise = 'Key'
        return clientData
    })
    .then(data => {
        return console.log('Modifine', data);
    })
    .catch(err => console.error('Error', err))
    .finally(() => console.log('Working...'))
/////////////////////////////
const sleep = ms => {
    return new Promise(res => {
        setTimeout(() => res(), ms)
    })
}
sleep(2000).then(() => console.log('After 2 sec'))
sleep(3000).then(() => console.log('After 3 sec'))

Promise.all([sleep(2000), sleep(3000)]).then(() => {
    return console.log('All promises...');
})
/////////////////////////////   
const promis1 = Promise.resolve('Hello world)...')
const promis2 = 34
const promis3 = new Promise((res, rej) => {
    setTimeout(res, 2000, 'Goodbye!!!')
})
const promis4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
Promise.all([promis1, promis2, promis3, promis4]).then(values => console.log(values))
////////////////////////////
Promise.race([sleep(2000), sleep(4000)]).then(() => {
    return console.log('Race promises...');
})

//==========Examples==========//
const posts = [
    { title: 'Post one', body: 'This is post one' },
    { title: 'Post twoo', body: 'This is post twoo' }
]

function getPost() {
    setTimeout(() => {
        let out = '';
        posts.forEach((post, index) => {
            out += `<li>${post.title}</li>`
        });
        document.body.innerHTML = out;
    }, 1000)
}
function creatPost(post) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            posts.push(post)
            const error = false;
            if (!error) {
                res()
            } else {
                rej('Something wrong...')
            }
        }, 2000)
    })
}
creatPost({ title: 'Post three', body: 'This is post three' })
    .then(getPost)
    .catch(err => console.log('Error: ', err))

//=====Async/Await/Fetch======//
async function fetchUsers() {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await users.json()
    console.log(data);
}
fetchUsers()


