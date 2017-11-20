highlight:function(){
    var aCodes = this.$el.getElementsByTagName('pre');
    for (var i=0; i < aCodes.length; i++) {
        hljs.highlightBlock(aCodes[i]);
        hljs.lineNumbersBlock(aCodes[i]);
    }
}