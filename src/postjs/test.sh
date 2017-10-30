filepath="../posts/*"
listfile="list2.vue"



# Get Line Num
sed -n '/router-link/=' ${listfile} | sed -e 's/<a>\(.*\)<a>/\1/'
IFS=$'\n' lineArray=($(sed -n '/router-link/=' ${listfile} | sed -e 's/<a>\(.*\)<a>/\1/'))
# echo ${lineArray[@]}

# Get KeyWord | Cut String after . | sort
sed -e '/<a>/!d' -e 's/.*<a>\([^>]*\)<\/a><\/li><\/router-link>/\1/' ${listfile} | cut -d. -f1 | sort -n

# Sort an Array
IFS=$'\n' sortArray=($(sed -e '/<a>/!d' -e 's/.*<a>\([^>]*\)<\/a><\/li><\/router-link>/\1/' ${listfile} | cut -d. -f1 | sort -n))
# echo ${sortArray[@]}

# Make an Name Array
IFS=$'\n' nameArray=($(sed -e '/<a>/!d' -e 's/.*<a>\([^>]*\)<\/a><\/li><\/router-link>/\1/' ${listfile} ))
# echo ${nameArray[@]}

# awk '/\*Add List Here/{f=1;next}/\*Add List Finished/{f=0}f' ${listfile} | sort -t '>' -n -k4 > list3.vue
awk '/Add List Here/,/Add List Finished/ {print}' < ${listfile}
sort -t '>' -n -k4 ${listfile} > list3.vue

# for i in "${sortArray[@]}"
# do
    
    # clean
    # sed -i.bak "/${a}/d" list.vue

    #import part
    # sed -i.bak '/Add List Here/a\
    # list_place_holder \
    # ' list.vue
    # sed -i.bak "s|list_place_holder|<router-link to="${a}"><li><a>${resultFirst#*:}</a></li></router-link>|g" list.vue
# done
