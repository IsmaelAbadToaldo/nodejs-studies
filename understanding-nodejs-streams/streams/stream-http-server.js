import http from 'node:http'
import { Transform } from 'node:stream'

class IverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log('transforming', chunk.toString(), 'to', String(transformed))

        callback(null, Buffer.from(String(transformed)))
    }
}

// req => readable stream
// res => writable stream

const server = http.createServer((req, res) => {
    req
        .pipe(new IverseNumberStream())
        .pipe(res)
})

server.listen(3334)