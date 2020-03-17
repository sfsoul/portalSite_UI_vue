import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

console.log(router)

router.beforeEach(async(to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
      }
    NProgress.start()
    next()
})
router.afterEach( route => {
    NProgress.done()
})