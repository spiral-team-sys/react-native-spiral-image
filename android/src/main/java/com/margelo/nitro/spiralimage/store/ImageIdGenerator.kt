package com.margelo.nitro.spiralimage.store

import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.UUID

object ImageIdGenerator {

    fun generate(): String {

        val time = SimpleDateFormat(
            "yyyyMMdd_HHmmss",
            Locale.US
        ).format(Date())

        val random = UUID.randomUUID()
            .toString()
            .substring(0, 8)
            .uppercase(Locale.US)

        return "SPI_${time}_$random"
    }
}