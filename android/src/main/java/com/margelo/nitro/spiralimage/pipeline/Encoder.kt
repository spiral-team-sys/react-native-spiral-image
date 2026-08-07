package com.margelo.nitro.spiralimage.pipeline

import android.graphics.Bitmap
import java.io.File
import java.io.FileOutputStream
import android.os.Build
import com.margelo.nitro.spiralimage.ImageFormat


object Encoder {


    fun encode(
        bitmap: Bitmap,
        output: File,
        format: ImageFormat,
        quality: Int
    ): Double {


        output.parentFile?.mkdirs()


        FileOutputStream(output)
            .use { stream ->


                bitmap.compress(

                    when(format){

                        ImageFormat.JPEG ->
                            Bitmap.CompressFormat.JPEG


                        ImageFormat.PNG ->
                            Bitmap.CompressFormat.PNG


                        ImageFormat.WEBP ->
                            Bitmap.CompressFormat.WEBP

                    },

                    quality.coerceIn(
                        0,
                        100
                    ),

                    stream
                )

            }


        return output.length()
            .toDouble()
    }
}