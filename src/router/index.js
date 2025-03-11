import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Main',
		meta: { public: true },
		component: () => import('@/pages/Index.vue')
	},
	{
		path: '/profile',
		name: 'Profile',
		meta: { public: true },
		component: () => import('@/pages/Profile.vue')
	},
	{
		path: '/storage',
		name: 'Storage',
		meta: { public: true },
		component: () => import('@/pages/ItemList.vue')
	},
	{
		path: '/storage/create',
		name: 'Create Storage Item',
		meta: { public: true },
		component: () => import('@/pages/ItemList.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!sessionStorage.getItem('token');

	if (to.meta.public) {
		next();
	} 
	else if (isAuthenticated) {
		next();
	} 
	else {
		next({ path: '/login', query: { redirect: to.fullPath } });
	}
});

export default router
