import { ShadButton } from "@/components/shadcn-button";


const PermissionModal = ({ permissionStatus, closePermissionModal }: { permissionStatus: 'granted' | 'denied' | 'prompt', closePermissionModal: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Microphone Access Required</h3>
            <p className="mb-4 text-gray-600">
                {permissionStatus === 'denied' ? (
                    <>
                        Microphone access has been blocked. To use this feature, please:
                        <ol className="ml-4 list-decimal">
                            <li>Click the camera/microphone icon in your browser's address bar</li>
                            <li>Select "Allow" for microphone access</li>
                            <li>Refresh the page</li>
                        </ol>
                    </>
                ) : (
                    "This app needs microphone access for calls. Please click 'Allow' when prompted."
                )}
            </p>
            <div className="flex justify-end space-x-3">
                <ShadButton variant="outline" onClick={closePermissionModal}>Cancel</ShadButton>
                <ShadButton onClick={permissionStatus === 'denied' ? () => window.location.reload() : closePermissionModal}>
                    {permissionStatus === 'denied' ? 'Refresh Page' : 'Try Again'}
                </ShadButton>
            </div>
        </div>
    </div>
);

export default PermissionModal