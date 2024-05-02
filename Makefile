start-redis:
	docker pull redis
	docker run --name majaliss-landing-page-redis -d -p 6379:6379 redis
	docker exec -it majaliss-landing-page-redis sh
	redis-cli
	ACL GENPASS
