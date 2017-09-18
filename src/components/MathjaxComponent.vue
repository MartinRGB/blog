<template>
<div class="Math-Container">
<!-- <h2>The Lorenz Equations</h2>

<p>
\begin{align}
  \nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
  \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
  \nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
  \nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}
</p>

<h2>The Cauchy-Schwarz Inequality</h2>

<p>\[
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} \leq
 \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
\]</p>

<h2>A Cross Product Formula</h2>

<p>\[
  \mathbf{V}_1 \times \mathbf{V}_2 =
   \begin{vmatrix}
    \mathbf{i} & \mathbf{j} & \mathbf{k} \\
    \frac{\partial X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\
    \frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} & 0 \\
   \end{vmatrix}
\]</p>

<h2>The probability of getting \(k\) heads when flipping \(n\) coins is:</h2>

<p>\[P(E) = {n \choose k} p^k (1-p)^{ n-k} \]</p>

<h2>An Identity of Ramanujan</h2>

<p>\[
   \frac{1}{(\sqrt{\phi \sqrt{5}}-\phi) e^{\frac25 \pi}} =
     1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}}
      {1+\frac{e^{-8\pi}} {1+\ldots} } } }
\]</p>

<h2>A Rogers-Ramanujan Identity</h2>

<p>\[
  1 +  \frac{q^2}{(1-q)}+\frac{q^6}{(1-q)(1-q^2)}+\cdots =
    \prod_{j=0}^{\infty}\frac{1}{(1-q^{5j+2})(1-q^{5j+3})},
     \quad\quad \text{for $|q|<1$}.
\]</p>

<h2>Maxwell's Equations</h2>

<p>
\begin{align}
  \nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
  \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
  \nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
  \nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}
</p>

<h2>In-line Mathematics</h2>

<blockquote>
<p>Finally, while display equations look good for a page of samples, the
ability to mix math and text in a paragraph is also important.  This
expression \(\sqrt{3x-1}+(1+x)^2\) is an example of an inline equation.  As
you see, MathJax equations can be used this way as well, without unduly
disturbing the spacing between lines.</p>


</blockquote>
<p>\[
  (\sqrt{3x-1}+(1+x)^2)
\]
</p> -->

<!-- <p>\[{{codeInfo}}\]</p> -->

<p>\begin{align}{{codeInfo}}\end{align}</p>
</div>

</template>

<script>

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

var scriptHasAdded = false;
var localScriptHasAdded = false;

export default {
  props:['bindFunc'],
  name: 'mathjax',
  data: function () {return {
    codeInfo:'',
  }},
  components: {},
  methods: {
     makeMath:function(){

      var mainScript = document.createElement("script");
      var configScript = document.createElement("script");
      var mathchoiceScript = document.createElement("script");
      var tex2jaxScript = document.createElement("script");
      var fontdataScript = document.createElement("script");
      var variantScript = document.createElement("script");

      mainScript.type = "text/javascript";
      mainScript.src  = require('mathjax');
      document.getElementsByTagName("head")[0].appendChild(mainScript);

      configScript.type = "text/javascript";
      configScript.src  = require('mathjax/config/Accessible-full.js');
      document.getElementsByTagName("head")[0].appendChild(configScript);

      mathchoiceScript.type = "text/javascript";
      mathchoiceScript.src  = require('mathjax/extensions/Tex/mathchoice.js');
      document.getElementsByTagName("head")[0].appendChild(mathchoiceScript);

      tex2jaxScript.type = "text/javascript";
      tex2jaxScript.src  = require('mathjax/extensions/tex2jax.js');
      document.getElementsByTagName("head")[0].appendChild(tex2jaxScript);

      fontdataScript.type = "text/javascript";
      fontdataScript.src  = require('mathjax/jax/output/HTML-CSS/fonts/STIX/fontdata.js');
      document.getElementsByTagName("head")[0].appendChild(fontdataScript);

      variantScript.type = "text/javascript";
      variantScript.src  = require('mathjax/jax/output/HTML-CSS/fonts/STIX/Variants/Regular/All.js');
      document.getElementsByTagName("head")[0].appendChild(variantScript);

     },
    fetchData() {

      if (this.bindFunc.split('.').pop() == 'html' || this.bindFunc.split('.').pop() == 'txt'){
        this.$http.get(this.bindFunc).then((response) => {
          // 响应成功回调
          this.codeInfo = response.data
          // nextTick 先拿数据，然后更新
          
        }, (response) => {
          // 响应错误回调
          this.codeInfo = 'Request Failed'
        }).then(this.refreshFunc);

      }
      else{
        this.codeInfo = this.bindFunc

        this.refreshFunc

      }


    },
    refreshFunc:function(){
      this.$nextTick(function () {
            // DOM UPdated
        this.makeMath()
        // 重新渲染
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      })
    }

  }
  ,computed: {

  },
  created: function () {

  },
  mounted:function(){

    this.fetchData()
  },
  destroyed:function(){
  }
}


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
