package com.margelo.nitro.spiralimage

import android.app.Application
import android.content.Context

object SpiralImageContext {

    @Volatile
    private var applicationContext: Context? = null

    fun initialize(
        context: Context
    ) {
        applicationContext = context.applicationContext
    }

    fun get(): Context {
        applicationContext?.let {
            return it
        }

        val fallback = currentApplicationContext()

        if (fallback != null) {
            applicationContext = fallback
            return fallback
        }

        error("SpiralImageContext is not initialized")
    }

    private fun currentApplicationContext(): Context? {
        return try {
            val activityThread =
                Class.forName("android.app.ActivityThread")

            val method =
                activityThread.getMethod("currentApplication")

            method.invoke(null) as? Application
        } catch (_: Throwable) {
            null
        }
    }
}
