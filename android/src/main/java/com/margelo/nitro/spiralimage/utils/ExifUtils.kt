package com.margelo.nitro.spiralimage.utils

import android.graphics.Bitmap
import android.graphics.Matrix
import androidx.exifinterface.media.ExifInterface

object ExifUtils {

  /**
   * Read EXIF orientation from image file.
   */
  fun getOrientation(path: String): Int {
    return try {
      val exif = ExifInterface(path)
      exif.getAttributeInt(
        ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL
      )
    } catch (_: Exception) {
      ExifInterface.ORIENTATION_NORMAL
    }
  }

  /**
   * Rotate / flip bitmap according to EXIF orientation.
   */
  fun applyOrientation(
    bitmap: Bitmap, orientation: Int
  ): Bitmap {

    val matrix = Matrix()

    when (orientation) {

      ExifInterface.ORIENTATION_NORMAL -> {
        return bitmap
      }

      ExifInterface.ORIENTATION_ROTATE_90 -> matrix.postRotate(90f)

      ExifInterface.ORIENTATION_ROTATE_180 -> matrix.postRotate(180f)

      ExifInterface.ORIENTATION_ROTATE_270 -> matrix.postRotate(270f)

      ExifInterface.ORIENTATION_FLIP_HORIZONTAL -> matrix.preScale(-1f, 1f)

      ExifInterface.ORIENTATION_FLIP_VERTICAL -> matrix.preScale(1f, -1f)

      ExifInterface.ORIENTATION_TRANSPOSE -> {
        matrix.preScale(-1f, 1f)
        matrix.postRotate(270f)
      }

      ExifInterface.ORIENTATION_TRANSVERSE -> {
        matrix.preScale(-1f, 1f)
        matrix.postRotate(90f)
      }

      else -> {
        return bitmap
      }
    }

    val rotated = Bitmap.createBitmap(
      bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true
    )

    if (rotated != bitmap) {
      bitmap.recycle()
    }

    return rotated
  }

  /**
   * Convenience method.
   */
  fun fixOrientation(
    bitmap: Bitmap, path: String
  ): Bitmap {

    val orientation = getOrientation(path)

    return applyOrientation(
      bitmap, orientation
    )
  }
}
