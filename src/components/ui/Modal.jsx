import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ModalContext } from "./modal-context"

const CLOSE_DURATION_MS = 200

function ModalProvider({ children }) {
  const [modalConfig, setModalConfig] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const previousFocusRef = useRef(null)
  const confirmButtonRef = useRef(null)
  const openFrameRef = useRef(null)

  const dismissModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const closeModal = useCallback(() => {
    if (isPending) {
      return
    }

    dismissModal()
  }, [dismissModal, isPending])

  const requestClose = useCallback(() => {
    if (isPending || modalConfig?.isDismissible === false) {
      return
    }

    dismissModal()
  }, [dismissModal, isPending, modalConfig])

  const openModal = useCallback((config) => {
    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement
    } else {
      previousFocusRef.current = null
    }

    setErrorMessage("")
    setIsPending(false)
    setIsVisible(false)
    setModalConfig({
      isDismissible: true,
      pendingLabel: "Working...",
      ...config,
    })
  }, [])

  const openConfirm = useCallback(
    (config) => {
      openModal({
        eyebrow: "Confirm action",
        cancelLabel: "Cancel",
        confirmLabel: "Continue",
        confirmTone: "primary",
        ...config,
      })
    },
    [openModal]
  )

  useEffect(() => {
    if (!modalConfig) {
      return undefined
    }

    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsVisible(true)
      confirmButtonRef.current?.focus()
    })

    return () => {
      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current)
        openFrameRef.current = null
      }
    }
  }, [modalConfig])

  useEffect(() => {
    if (!modalConfig) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        requestClose()
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [modalConfig, requestClose])

  useEffect(() => {
    if (!modalConfig || isVisible) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setModalConfig(null)
      setIsPending(false)
      setErrorMessage("")
      previousFocusRef.current?.focus?.()
      previousFocusRef.current = null
    }, CLOSE_DURATION_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isVisible, modalConfig])

  async function handleConfirm() {
    if (!modalConfig?.onConfirm || isPending) {
      return
    }

    setErrorMessage("")
    setIsPending(true)

    try {
      await modalConfig.onConfirm()
      dismissModal()
    } catch {
      setErrorMessage("We couldn't complete that action. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  const modalRoot = document.getElementById("modal-root")
  const confirmButtonClassName =
    modalConfig?.confirmTone === "danger"
      ? "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-500"
      : "bg-sky-500 text-white hover:bg-sky-600 focus-visible:outline-sky-500"
  const contextValue = useMemo(
    () => ({ closeModal, openConfirm, openModal }),
    [closeModal, openConfirm, openModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalRoot &&
        modalConfig &&
        createPortal(
          <div
            className={[
              "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 transition-opacity duration-200 ease-out",
              isVisible ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            onClick={requestClose}
          >
            <section
              aria-describedby={
                modalConfig.description ? "app-modal-description" : undefined
              }
              aria-labelledby={
                modalConfig.title ? "app-modal-title" : undefined
              }
              aria-modal="true"
              className={[
                "w-full max-w-md rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/80 backdrop-blur transition-all duration-200 ease-out",
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-4 scale-[0.97] opacity-0",
                modalConfig.panelClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  {modalConfig.eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      {modalConfig.eyebrow}
                    </p>
                  )}
                  {modalConfig.title && (
                    <h2
                      id="app-modal-title"
                      className="text-2xl font-semibold text-slate-950"
                    >
                      {modalConfig.title}
                    </h2>
                  )}
                  {modalConfig.description && (
                    <p
                      id="app-modal-description"
                      className="text-sm leading-6 text-slate-600"
                    >
                      {modalConfig.description}
                    </p>
                  )}
                </div>

                {modalConfig.content}

                {errorMessage && (
                  <p className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {errorMessage}
                  </p>
                )}

                {!modalConfig.hideActions && (
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={closeModal}
                      type="button"
                    >
                      {modalConfig.cancelLabel}
                    </button>
                    <button
                      className={[
                        "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
                        confirmButtonClassName,
                      ].join(" ")}
                      disabled={isPending}
                      onClick={handleConfirm}
                      ref={confirmButtonRef}
                      type="button"
                    >
                      {isPending
                        ? modalConfig.pendingLabel
                        : modalConfig.confirmLabel}
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>,
          modalRoot
        )}
    </ModalContext.Provider>
  )
}

export { ModalProvider }
