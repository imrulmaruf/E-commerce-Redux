import { useState, useMemo, useCallback } from "react";
import { useGetProductsQuery } from "../../features/products/productsApi";
import ProductCard from "../components/ProductCard";
import Loader from "../../app/components/Loader";

export default function Home() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => !category || p.category === category);
  }, [data, search, category]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "desc") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [filtered, sort]);

  const categories = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map(p => p.category))];
  }, [data]);

  const SkeletonGrid = useCallback(() => (
    <div className="products-grid">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  ), []);

  return (
    <div className="home-page">
      {/* Hero Filters */}
      <div className="filters-section">
        <div className="filter-tabs">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="filter-select"
          >
            <option value="">Sort by Price</option>
            <option value="asc">💰 Low → High</option>
            <option value="desc">💎 High → Low</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="products-section">
        {isLoading ? (
          <SkeletonGrid />
        ) : isError ? (
          <div className="error-state">
            <h3>😔 Failed to load products</h3>
            <button className="btn-retry" onClick={() => refetch()}>
              🔄 Retry
            </button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <h3>😢 No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="products-grid">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
