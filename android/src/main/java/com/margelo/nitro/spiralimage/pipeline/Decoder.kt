package com.margelo.nitro.spiralimage.pipeline


import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import com.margelo.nitro.spiralimage.SpiralImageContext


object Decoder {


    fun decode(
        path: String
    ): Bitmap {

        if (path.startsWith("content://")) {
            return decodeContentUri(path)
        }


        val realPath =
            path.replace(
                "file://",
                ""
            )


        return BitmapFactory.decodeFile(
            realPath
        )
            ?: throw IllegalArgumentException(
                "Cannot decode image: $path"
            )

    }

    private fun decodeContentUri(
        uriString: String
    ): Bitmap {

        val uri =
            Uri.parse(uriString)

        val resolver =
            SpiralImageContext.get()
                .contentResolver

        resolver.openInputStream(uri)
            ?.use { input ->
                return BitmapFactory.decodeStream(input)
                    ?: throw IllegalArgumentException(
                        "Cannot decode content URI: $uriString"
                    )
            }

        throw IllegalArgumentException(
            "Cannot open content URI: $uriString"
        )
    }

}