package com.margelo.nitro.spiralimage
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class SpiralImage : HybridSpiralImageSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
