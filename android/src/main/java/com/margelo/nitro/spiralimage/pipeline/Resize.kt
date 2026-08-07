package com.margelo.nitro.spiralimage.pipeline


import android.graphics.Bitmap


object Resize {


    fun execute(
        bitmap: Bitmap,
        width: Int?,
        height: Int?
    ): Bitmap {


        if (
            width == null &&
            height == null
        ) {
            return bitmap
        }



        val targetWidth =
            width ?: bitmap.width



        val targetHeight =
            height ?: bitmap.height



        return Bitmap.createScaledBitmap(

            bitmap,

            targetWidth,

            targetHeight,

            true

        )
    }

}