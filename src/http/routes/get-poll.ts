import {z} from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"

export async function getPoll(app : FastifyInstance) {

    app.get('/polls/:pollId', async (request, reply) => {
    

    const getPollParams = z.object({
        pollId: z.string().uuid()
    })
    
    const {pollId} = getPollParams.parse(request.body)

    const poll = await prisma.poll.findUnique({
        where: {id: pollId,},
        include: {options: {select: {
            id: true,
            title: true
        }}}
    })

    return reply.status(201).send({ poll })

    })
}