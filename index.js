const http = require("http")

const host = "localhost"
const port = 6143

let storage = {}

const requestListener = function (req, res) {
    res.writeHead(200)
    if(req.method=="GET"){
        let rest = req.url.slice(5)
        if(req.url.startsWith("/get/")){
            if(rest.indexOf("=")==-1){
                let value = storage[rest]
                if(!value){
                    value = ""
                }
                res.end(value)
            }else{
                res.end("Bad request")
            }
        }else if(req.url.startsWith("/set/")){
            let split = rest.split("=")
            if(split.length!=2){
                res.end("Bad request")
            }else{
                storage[split[0]] = split[1]
                res.end(`Set ${split[0]} to ${split[1]}`)
            }
        }else{
            res.end("Not found")
        }
    }
    // console.log(req)
}

const server = http.createServer(requestListener)
server.listen(port, null, () => {
    console.log(`Server is running on http://${host}:${port}`)
})