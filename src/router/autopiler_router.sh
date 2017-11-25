#! /bin/bash
jsfilename="index.js"
vuefilename="../postjs/list.vue"
filepath="../posts/*"

num=0

for file in $filepath
do
    a=${file:9}
    a=${a/.vue/}

    resultSecond=$(grep -w "articleTitle:"  ${file} | cut -f2 -d\' | cut -f1 -d".")
    #echo ${resultSecond}

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
    sed -i.bak "s|exportholder|    ,{path: '/${a}',name: 'Article${resultSecond}',component: ${a},meta: {keepAlive: true}}|g" index.js
done

