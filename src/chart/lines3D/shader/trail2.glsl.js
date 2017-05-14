module.exports = "@export ecgl.trail2.vertex\nattribute vec3 position: POSITION;\nattribute vec3 positionPrev;\nattribute vec3 positionNext;\nattribute float offset;\nattribute float dist;\nattribute float distAll;\nattribute float start;\n\nattribute vec4 a_Color : COLOR;\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform vec4 viewport : VIEWPORT;\nuniform float near : NEAR;\n\nuniform float speed : 0;\nuniform float trailLength: 0.3;\nuniform float time;\nuniform float period: 1000;\n\nvarying vec4 v_Color;\nvarying float v_Percent;\n\n@import ecgl.common.wireframe.vertexHeader\n\n@import ecgl.lines3D.clipNear\n\nvoid main()\n{\n    @import ecgl.lines3D.expandLine\n\n    gl_Position = currProj;\n\n    v_Color = a_Color;\n\n    @import ecgl.common.wireframe.vertexMain\n\n#ifdef CONSTANT_SPEED\n    float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;\n#else\n    float t = mod((time + start) / period, 1. + trailLength) - trailLength;\n#endif\n\n    float trailLen = distAll * trailLength;\n\n    v_Percent = (dist - t * distAll) / trailLen;\n\n                }\n@end\n\n\n@export ecgl.trail2.fragment\n\nuniform vec4 color : [1.0, 1.0, 1.0, 1.0];\n\nvarying vec4 v_Color;\nvarying float v_Percent;\n\n@import ecgl.common.wireframe.fragmentHeader\n\n@import qtek.util.srgb\n\nvoid main()\n{\nif (v_Percent > 1.0 || v_Percent < 0.0) {\n    discard;\n}\n\n    float fade = v_Percent;\n            if (v_Percent > 0.9) {\n        fade *= 2.0;\n    }\n\n#ifdef SRGB_DECODE\n    gl_FragColor = sRGBToLinear(color * v_Color);\n#else\n    gl_FragColor = color * v_Color;\n#endif\n\n    @import ecgl.common.wireframe.fragmentMain\n\n    gl_FragColor.a *= fade;\n}\n\n@end";
