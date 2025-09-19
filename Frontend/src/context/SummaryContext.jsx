import React, { createContext, useState, useContext } from 'react';
import aiService from '../api/aiService';

const SummaryContext = createContext();

export const useSummary = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryContent, setSummaryContent] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const fetchSummary = async (articleContent) => {
    setIsSummaryOpen(true);
    setIsLoadingSummary(true);
    setSummaryError('');
    setSummaryContent('');

    try {
      const response = await aiService.getSummary(articleContent);
      setSummaryContent(response.data.summary);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
      setSummaryError("Sorry, we couldn't generate a summary for this article. Please try again later.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const closeSummary = () => {
    setIsSummaryOpen(false);
    setSummaryContent('');
    setSummaryError('');
  };

  const value = {
    isSummaryOpen,
    summaryContent,
    isLoadingSummary,
    summaryError,
    fetchSummary,
    closeSummary,
  };

  return (
    <SummaryContext.Provider value={value}>
      {children}
    </SummaryContext.Provider>
  );
};