import React, { useState } from "react";
import axiosAPI from "../../utils/axiosAPI.ts";
import { ILink } from "../../types";
import { isAxiosError } from 'axios';

const LinkForm = () => {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      alert("Please input valid URL");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosAPI.post<ILink>("links", { url });
      if (response.data) {
        setShortUrl(response.data.shortUrl);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const errorData = err.response?.data as ({error: string});
        alert(errorData?.error);
      }
    } finally {
      setLoading(false);
      setUrl("");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">URL Shortener</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label htmlFor="urlInput" className="form-label">
                Enter URL
              </label>
              <input
                type="text"
                id="urlInput"
                className="form-control"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary align-self-center"
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Shorten URL
            </button>
          </form>

          {shortUrl && (
            <div className="mt-4 text-center">
              <h5>Your link now looks like this:</h5>
              <a
                href={`http://localhost:8000/links/${shortUrl}`}
                className="btn btn-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:8000/links/{shortUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
