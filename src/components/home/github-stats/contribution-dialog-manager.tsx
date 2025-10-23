"use client";

import { useState, useEffect } from "react";
import { ContributionDetailDialog, detailsCache } from "./contribution-detail-dialog";
import { fetchContributionDetails } from "./queries";

// Track in-progress fetches to prevent duplicates
const fetchInProgress = new Map<string, Promise<unknown>>();

// Prefetch function that can be called from anywhere
export function prefetchContributionData(username: string, date: string, count: number) {
  if (count === 0) return;
  
  const cacheKey = `${username}-${date}`;
  
  if (detailsCache.has(cacheKey) || fetchInProgress.has(cacheKey)) {
    return;
  }
  
  const fetchPromise = fetchContributionDetails(username, date)
    .then((data) => {
      detailsCache.set(cacheKey, data);
      fetchInProgress.delete(cacheKey);
      return data;
    })
    .catch(() => {
      fetchInProgress.delete(cacheKey);
    });
  
  fetchInProgress.set(cacheKey, fetchPromise);
}

// Global event system for dialog
type DialogEventListener = (date: string, count: number) => void;
const dialogListeners = new Set<DialogEventListener>();

export function subscribeToDialogOpen(listener: DialogEventListener) {
  dialogListeners.add(listener);
  return () => {
    dialogListeners.delete(listener);
  };
}

export function openContributionDialog(date: string, count: number) {
  dialogListeners.forEach(listener => listener(date, count));
}

interface ContributionDialogManagerProps {
  username: string;
}

export function ContributionDialogManager({ username }: ContributionDialogManagerProps) {
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    count: number;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToDialogOpen((date, count) => {
      setSelectedDay({ date, count });
      setIsDialogOpen(true);
    });
    return unsubscribe;
  }, []);

  return (
    <ContributionDetailDialog
      username={username}
      date={selectedDay?.date || ""}
      count={selectedDay?.count || 0}
      isOpen={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        setSelectedDay(null);
      }}
    />
  );
}

