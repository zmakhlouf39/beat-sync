import { useState } from 'react';

interface DropZoneProps {
onFile: (file: File) => void;
disabled?: boolean;
}

export function DropZone({ onFile, disabled = false }: DropZoneProps) {
    const [over, setOver] = useState(false);
    return (
            <label
                className={over ? 'dropzone is-over' : 'dropzone'}
                onDragOver={
                    (e) => { 
                        e.preventDefault();
                        setOver(true);
                    }}
                onDragLeave={() => setOver(false)}
                onDrop={(e) => {
                        e.preventDefault();
                        setOver(false);
                        const file = e.dataTransfer.files[0];
                        if (file) onFile(file);
                    }}
            >

                <input
                    className="visually-hidden"
                    type="file"
                    accept="audio/*"
                    disabled={disabled}
                    onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onFile(file);
                                e.target.value = ''; // lets you pick the same file twice
                            }}
                />
                <span>Drop a track here, or click to choose one</span>
            </label>
    );
}