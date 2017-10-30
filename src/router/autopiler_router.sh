#! /bin/bash
jsfilename="index.js"
vuefilename="../postjs/list.vue"
filepath="../posts/*"

for file in $filepath
do
    a=${file:9}
    a=${a/.vue/}

    # clean
    sed -i.bak "/${a}/d" index.js

    #import part
    sed -i.bak '/Use Shell Import/a\
    importholder \
    ' index.js
    sed -i.bak "s|importholder|import ${a} from \'@/posts/${a}\'|g" index.js

    # export
    sed -i.bak '/Use Shell Export/a\
    exportholder \
    ' index.js
    sed -i.bak "s|exportholder|   ,{path: '/${a}',name: '${a}',component: ${a},meta: {keepAlive: true}}|g" index.js
done

