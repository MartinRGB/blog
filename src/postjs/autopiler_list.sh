#! /bin/bash
jsfilename="list.js"
vuefilename="list.vue"
filepath="../posts/*"

# index.js - Create new
# clean
echo "" > $jsfilename
# import
echo import Vue from \'vue\' >> $jsfilename
for file in $filepath
do
    a=${file:9}
    a=${a/.vue/}
    echo import ${a} from \'../posts/${a}.vue\' >> $jsfilename
    echo "Vue.component('"${a}\'", ${a})" >> $jsfilename
done

# export
result=""
for file in $filepath
do
    a=${file:9}
    a=${a/.vue/}
    result=${result}${a}", "
done
all=${result}
all=${all%?}
all=${all%?}
echo export default "["$all"]" >> $jsfilename

# list.vue - Create new
# echo "" > $vuefilename
# echo "<template>" >> $vuefilename
# echo "<ul>" >> $vuefilename

# for file in $filepath
# do

#     a=${file:9}
#     # title = ${file##articleTitle:}
#     a=${a/.vue/}
#     resultFirst=$(grep -w "articleTitle:"  ${file} | cut -f2 -d\')
#     printf $resultFirst

#     echo "<router-link to="${a}"><li><a>${resultFirst#*:}</a></li></router-link>" >> $vuefilename
#     # echo "<router-link to="{path:"/"+"${a}",name:"${a}",component:"${a}"}"><li><"${a}"><
#     # echo "<div>tester</div>" >> $vuefilename
#     # printf $result

# done
# echo "</ul>" >> $vuefilename
# echo "</template>" >> $vuefilename


# list.vue - Replacement
results=()
for file in $filepath
do

    a=${file:9}
    a=${a/.vue/}
    resultFirst=$(grep -w "articleTitle:"  ${file} | cut -f2 -d\')
    # clean
    sed -i.bak "/${a}/d" list.vue

    #import part
    # sed -i.bak '/Add List Here/a\
    # list_place_holder \
    # ' list.vue
    # sed -i.bak "s|list_place_holder|<router-link to="${a}"><li><a>${resultFirst#*:}</a></li></router-link>|g" list.vue
    results+="<router-link to="${a}"><\li><a>${resultFirst#*:}<\/a><\/li><\/router-link> \n"
    # echo "<router-link to="${a}"><li><a>${resultFirst#*:}</a></li></router-link>" >> $vuefilename
    # echo "<router-link to="{path:"/"+"${a}",name:"${a}",component:"${a}"}"><li><"${a}"><
    # echo "<div>tester</div>" >> $vuefilename
    # printf $result
done

# breaker
IFS=$'\n' breaker="${results[*]}"
# sorter
sorter=$(printf "${breaker}" | sort -t '>' -n -k4)
# reorder
reorder=$(printf "%s" $sorter)
echo "$reorder"
# Add into File
sed -i.bak '/Add List Here/a\
list_place_holder \
' list.vue
sed -i.bak "s|list_place_holder|$reorder|g" list.vue