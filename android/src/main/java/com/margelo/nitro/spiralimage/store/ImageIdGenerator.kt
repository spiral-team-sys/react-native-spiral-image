package com.margelo.nitro.spiralimage.store

import java.util.UUID


object ImageIdGenerator {


    fun generate(
        path: String
    ): String {


        val name =
            path
                .substringAfterLast("/")
                .substringBeforeLast(".")



        return "$name-${UUID.randomUUID()}"

    }
}