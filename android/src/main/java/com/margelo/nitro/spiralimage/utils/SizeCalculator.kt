package com.margelo.nitro.spiralimage.utils

import android.graphics.BitmapFactory
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

object SizeCalculator {

  fun calculateInSampleSize(
    options: BitmapFactory.Options, reqWidth: Int?, reqHeight: Int?
  ): Int {

    if (reqWidth == null || reqHeight == null) {
      return 1
    }

    val srcWidth = options.outWidth
    val srcHeight = options.outHeight

    var inSampleSize = 1

    if (srcHeight > reqHeight || srcWidth > reqWidth) {

      var halfHeight = srcHeight / 2
      var halfWidth = srcWidth / 2

      while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
        inSampleSize *= 2
      }
    }

    return max(1, inSampleSize)
  }

  /**
   * Keep aspect ratio (FIT)
   */
  fun calculateFitSize(
    srcWidth: Int, srcHeight: Int, reqWidth: Int, reqHeight: Int
  ): Pair<Int, Int> {

    val ratio = min(
      reqWidth.toFloat() / srcWidth, reqHeight.toFloat() / srcHeight
    )

    return Pair(
      (srcWidth * ratio).roundToInt(), (srcHeight * ratio).roundToInt()
    )
  }

  /**
   * Fill target (CENTER CROP)
   */
  fun calculateFillSize(
    srcWidth: Int, srcHeight: Int, reqWidth: Int, reqHeight: Int
  ): Pair<Int, Int> {

    val ratio = max(
      reqWidth.toFloat() / srcWidth, reqHeight.toFloat() / srcHeight
    )

    return Pair(
      (srcWidth * ratio).roundToInt(), (srcHeight * ratio).roundToInt()
    )
  }
}
