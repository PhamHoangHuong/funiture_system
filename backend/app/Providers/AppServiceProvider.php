<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Attributes\Repositories\AttributeRepository;
use Modules\Attributes\Repositories\AttributeRepositoryInterface;
use Modules\Attributes\Repositories\AttributeValueRepositoryInterface;
use Modules\Attributes\Repositories\AttributeValueRepository;
use Modules\Cart\Repositories\CartItemRepository;
use Modules\Cart\Repositories\CartItemRepositoryInterface;
use Modules\Cart\Repositories\CartRepository;
use Modules\Cart\Repositories\CartRepositoryInterface;
use Modules\CartPriceRule\Repositories\CartPriceRuleConditionRepository;
use Modules\CartPriceRule\Repositories\CartPriceRuleConditionRepositoryInterface;
use Modules\CartPriceRule\Repositories\CartPriceRuleRepository;
use Modules\CartPriceRule\Repositories\CartPriceRuleRepositoryInterface;
use Modules\Category\Repositories\CategoriesRepository;
use Modules\Category\Repositories\CategoriesRepositoryInterface;
use Modules\Customer\Repositories\CustomerRepository;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\GroupCustomer\Repositories\GroupCustomerRepository;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;
use Modules\Post\Repositories\PostRepository;
use Modules\Post\Repositories\PostRepositoryInterface;
use Modules\Product\Repositories\ProductRepositoryInterface;
use Modules\Product\Repositories\ProductRepository;
use Modules\Source\Repositories\SourceRepository;
use Modules\Source\Repositories\SourceRepositoryInterface;
use Modules\Topic\Repositories\TopicRepository;
use Modules\Topic\Repositories\TopicRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);

        $this->bindingsRepository();
    }

    public function bindingsRepository()
    {
        // Attribute
        $this->app->singleton(
            AttributeRepositoryInterface::class,
            AttributeRepository::class
        );

        // AttributeValue
        $this->app->singleton(
            AttributeValueRepositoryInterface::class,
            AttributeValueRepository::class
        );

        // Product
        $this->app->singleton(
            ProductRepositoryInterface::class,
            ProductRepository::class
        );

        // Source
        $this->app->singleton(
            SourceRepositoryInterface::class,
            SourceRepository::class
        );
        // Source
        $this->app->singleton(
            CategoriesRepositoryInterface::class,
            CategoriesRepository::class
        );
        //GroupCustomer
        $this->app->singleton(
            GroupCustomerRepositoryInterface::class,
            GroupCustomerRepository::class
        );
        //Customer
        $this->app->singleton(
            CustomerRepositoryInterface::class,
            CustomerRepository::class
        );

        //Cart
        $this->app->singleton(
            CartRepositoryInterface::class,
            CartRepository::class
        );

        //CartItem
        $this->app->singleton(
            CartItemRepositoryInterface::class,
            CartItemRepository::class
        );

        //CartPriceRule
        $this->app->singleton(
            CartPriceRuleRepositoryInterface::class,
            CartPriceRuleRepository::class
        );
        //CartPriceRuleCondition
        $this->app->singleton(
            CartPriceRuleConditionRepositoryInterface::class,
            CartPriceRuleConditionRepository::class
        );
        //Topic
        $this->app->singleton(
            TopicRepositoryInterface::class,
            TopicRepository::class
        );
        //Post
        $this->app->singleton(
            PostRepositoryInterface::class,
            PostRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
