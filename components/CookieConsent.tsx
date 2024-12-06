"use client";

import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookieConsent";
const COOKIE_EXPIRY_DAYS = 365;

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consentCookie = cookie.get(COOKIE_CONSENT_KEY);
      if (!consentCookie) {
        setShowBanner(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (consent: 'accepted' | 'rejected') => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBanner(false);
      setIsClosing(false);
      cookie.set(COOKIE_CONSENT_KEY, consent, {
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: "strict",
        secure: true,
      });
    }, 300);
  };

  if (!showBanner) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform transition-all duration-300 z-50 ${
        isClosing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold mb-2">Cookie Settings</h3>
            <p className="text-gray-600 mb-2">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            </p>
            <p className="text-sm text-gray-500">
              You can change your preferences at any time through our privacy policy.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 min-w-[200px]">
            <Button
              variant="outline"
              onClick={() => handleConsent('rejected')}
              className="flex-1"
            >
              Reject All
            </Button>
            <Button
              onClick={() => handleConsent('accepted')}
              className="flex-1 bg-[#344E41] hover:bg-[#A3B18A]"
            >
              Accept All
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 md:static"
            onClick={() => handleConsent('rejected')}
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
